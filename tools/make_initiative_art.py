import math, random
from playwright.sync_api import sync_playwright
from PIL import Image
random.seed(7)
W,H=1800,1200

def benban():
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
    '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a4a"/><stop offset=".45" stop-color="#e0703c"/><stop offset=".62" stop-color="#ffcf7a"/></linearGradient>',
    '<radialGradient id="sun"><stop offset="0" stop-color="#fff6d0"/><stop offset=".25" stop-color="#ffd166"/><stop offset="1" stop-color="#ffd16600"/></radialGradient>',
    '<linearGradient id="sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98a4b"/><stop offset="1" stop-color="#6b3f1e"/></linearGradient>',
    '<linearGradient id="pv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14306b"/><stop offset=".5" stop-color="#2f6fd0"/><stop offset="1" stop-color="#0b1c44"/></linearGradient></defs>',
    f'<rect width="{W}" height="{H}" fill="url(#sky)"/>']
    for _ in range(90):
        s.append(f'<circle cx="{random.randint(0,W)}" cy="{random.randint(0,430)}" r="{random.random()*1.8+.4}" fill="#fff" opacity="{random.random()*.7}"/>')
    s.append(f'<circle cx="900" cy="690" r="520" fill="url(#sun)"/><circle cx="900" cy="700" r="92" fill="#fff3c4"/>')
    s.append(f'<path d="M0 700 Q300 640 620 690 T1240 680 T1800 700 V{H} H0Z" fill="#8f5a2c"/>')
    s.append(f'<rect y="720" width="{W}" height="{H-720}" fill="url(#sand)"/>')
    # perspective rows of panels
    vx,vy=900,720
    for r in range(14):
        t=(r/14)**1.7; y=vy+t*(H-vy-40)+8; h=14+t*120; w=260+t*1500
        n=int(6+t*8)
        for c in range(-n,n+1):
            x=vx+c*(w/(n*1.4+1)); pw=w/(n*1.4+1)*.86
            s.append(f'<path d="M{x-pw/2:.1f} {y:.1f} L{x+pw/2:.1f} {y:.1f} L{x+pw/2+pw*.06:.1f} {y+h:.1f} L{x-pw/2-pw*.06:.1f} {y+h:.1f}Z" fill="url(#pv)" stroke="#9fc4ff" stroke-width="{.6+t*1.4:.1f}" opacity="{.55+t*.45:.2f}"/>')
    s.append(f'<rect width="{W}" height="{H}" fill="none"/></svg>')
    return ''.join(s)

def rail():
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
    '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1530"/><stop offset=".5" stop-color="#5a3b7a"/><stop offset=".75" stop-color="#f29a5a"/><stop offset="1" stop-color="#f7c57a"/></linearGradient>',
    '<linearGradient id="train" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#d7dde8"/><stop offset="1" stop-color="#7a8599"/></linearGradient>',
    '<linearGradient id="glow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d2ff0000"/><stop offset="1" stop-color="#d2ff00"/></linearGradient>',
    '<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b87a45"/><stop offset="1" stop-color="#4c2d16"/></linearGradient></defs>',
    f'<rect width="{W}" height="{H}" fill="url(#sky)"/>']
    for _ in range(70): s.append(f'<circle cx="{random.randint(0,W)}" cy="{random.randint(0,420)}" r="{random.random()*1.6+.4}" fill="#fff" opacity="{random.random()*.8}"/>')
    s.append('<circle cx="1330" cy="760" r="210" fill="#ffd9a0" opacity=".55"/><circle cx="1330" cy="760" r="78" fill="#fff0cf"/>')
    s.append(f'<path d="M0 780 Q250 720 520 770 T1100 760 T1800 790 V{H}H0Z" fill="#7e4e27"/><rect y="840" width="{W}" height="{H-840}" fill="url(#ground)"/>')
    # catenary masts
    for i in range(12):
        t=i/11; x=40+t**1.6*1760; hh=60+t*260; y=860+t*230
        s.append(f'<rect x="{x:.0f}" y="{y-hh:.0f}" width="{3+t*7:.0f}" height="{hh:.0f}" fill="#20242e"/><rect x="{x-30-t*50:.0f}" y="{y-hh:.0f}" width="{60+t*100:.0f}" height="{2+t*3:.0f}" fill="#20242e"/>')
    # tracks
    s.append('<path d="M-20 1100 L840 850 M540 1200 L940 850" stroke="#cfd6e4" stroke-width="5" fill="none" opacity=".7"/>')
    # train
    s.append('<g transform="translate(180 690)"><path d="M0 120 Q0 30 70 22 H1140 Q1330 40 1420 120 L1420 180 H0Z" fill="url(#train)"/><path d="M1140 22 Q1330 40 1420 120 H1140Z" fill="#9db0c9" opacity=".6"/>')
    for i in range(19): s.append(f'<rect x="{80+i*58}" y="62" width="40" height="34" rx="8" fill="#0d1530"/>')
    s.append('<rect y="128" width="1420" height="12" fill="#d2ff00"/><rect y="150" width="1420" height="6" fill="#20242e" opacity=".5"/></g>')
    s.append('<rect x="-40" y="770" width="240" height="60" fill="url(#glow)" opacity=".0"/>')
    for i in range(6): s.append(f'<rect x="{-100+i*40}" y="{760+i*24}" width="{260-i*20}" height="3" fill="#fff" opacity=".35"/>')
    s.append('</svg>')
    return ''.join(s)

def village():
    s=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
    '<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a4a78"/><stop offset=".5" stop-color="#f2b872"/><stop offset="1" stop-color="#f8dca4"/></linearGradient>',
    '<linearGradient id="nile" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3f8fbf"/><stop offset=".5" stop-color="#8fd0e8"/><stop offset="1" stop-color="#3f8fbf"/></linearGradient>',
    '<linearGradient id="field" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cab3f"/><stop offset="1" stop-color="#3f6b22"/></linearGradient></defs>',
    f'<rect width="{W}" height="{H}" fill="url(#sky)"/><circle cx="1350" cy="430" r="150" fill="#fff3c4" opacity=".85"/><circle cx="1350" cy="430" r="70" fill="#fffbe8"/>',
    f'<path d="M0 560 Q400 500 800 560 T1800 540 V{H}H0Z" fill="#c69563"/><rect y="600" width="{W}" height="{H-600}" fill="url(#field)"/>']
    for r in range(7):
        y=640+r*62; 
        for c in range(0,W,46): s.append(f'<path d="M{c} {y} q8 -20 16 0 q8 -24 16 0" stroke="#2f5a16" stroke-width="3" fill="none" opacity=".5"/>')
    s.append(f'<path d="M-50 900 Q500 820 950 900 T1850 850 V1010 Q1100 1060 600 1000 T-50 1040Z" fill="url(#nile)" opacity=".92"/>')
    # sail boat
    s.append('<path d="M1180 905 L1180 820 L1250 900Z" fill="#fff"/><path d="M1150 905 H1270 L1250 925 H1170Z" fill="#6b3f1e"/>')
    # houses
    def house(x,y,w,h,col):
        s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{col}"/><rect x="{x-6}" y="{y-8}" width="{w+12}" height="10" fill="#8a5a33"/><rect x="{x+w*.15}" y="{y+h*.35}" width="{w*.22}" height="{h*.3}" fill="#6fd0ff"/><rect x="{x+w*.6}" y="{y+h*.45}" width="{w*.22}" height="{h*.55}" fill="#4a2f1a"/>')
    for i,(x,y,w,h) in enumerate([(120,640,150,110),(330,610,130,120),(520,650,170,100),(1330,625,150,115),(1530,650,140,100),(1120,610,120,130),(760,640,140,105)]):
        house(x,y,w,h,['#f5e6c8','#efd9b0','#fff1d6'][i%3])
    # minaret + school + clinic
    s.append('<rect x="930" y="470" width="34" height="200" fill="#f2e3c2"/><path d="M923 470 L947 420 L971 470Z" fill="#e7c872"/><circle cx="947" cy="408" r="8" fill="#e7c872"/><rect x="900" y="660" width="92" height="30" fill="#f2e3c2"/>')
    s.append('<rect x="1660" y="600" width="110" height="100" fill="#fff"/><rect x="1698" y="625" width="34" height="8" fill="#e23b3b"/><rect x="1711" y="612" width="8" height="34" fill="#e23b3b"/>')
    # palms
    for x in (60,280,470,700,1050,1290,1490,1760):
        s.append(f'<rect x="{x}" y="560" width="9" height="140" fill="#6b4a2a"/>'+''.join(f'<path d="M{x+4} 560 q{dx} {dy} {dx*2} {dy+30}" stroke="#2f6a1d" stroke-width="7" fill="none" stroke-linecap="round"/>' for dx,dy in [(-50,-30),(50,-30),(-70,0),(70,0),(0,-50)]))
    s.append('</svg>')
    return ''.join(s)

items={'benban_solar_farm_1790800000001':benban(),'high_speed_rail_egypt_1790800000002':rail(),'decent_life_village_1790800000003':village()}
out='/home/claude/work/source/src/assets/images/'
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':W,'height':H})
    for n,svg in items.items():
        pg.set_content(f'<html><body style="margin:0">{svg}</body></html>'); pg.screenshot(path=f'/tmp/{n}.png')
        im=Image.open(f'/tmp/{n}.png').convert('RGB')
        im.save(out+n+'.webp','WEBP',quality=84)
        t=im.copy(); t.thumbnail((720,480)); t.save(out+n+'_t.webp','WEBP',quality=80)
        print(n)
    b.close()
