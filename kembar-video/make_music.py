# Musik latar orisinal: melodi ceria pentatonik + bass sederhana, 15 detik
import math, struct, wave
SR=44100; BPM=116; beat=60/BPM; DUR=15
N=lambda m:440*2**((m-69)/12)
mel=[72,74,76,79,76,74,72,69, 72,74,76,79,81,79,76,74, 76,79,81,79,76,74,72,74, 76,74,72,69,67,69,72,72]
bass=[48,48,55,55,45,45,52,52,53,53,48,48,55,55,48,48]
buf=[0.0]*(SR*DUR)
def note(start,length,freq,vol,kind):
    s=int(start*SR); n=int(length*SR)
    for i in range(n):
        if s+i>=len(buf): break
        t=i/SR; env=min(1,t/0.01)*math.exp(-t*(5 if kind=='m' else 3))
        if kind=='m': v=math.sin(2*math.pi*freq*t)+0.3*math.sin(4*math.pi*freq*t)
        else: v=math.sin(2*math.pi*freq*t)
        buf[s+i]+=vol*env*v
step=beat/2
for k in range(int(DUR/step)):
    note(k*step,step*1.6,N(mel[k%len(mel)]),0.22,'m')
for k in range(int(DUR/beat)):
    note(k*beat,beat*0.9,N(bass[(k//1)%len(bass)]-12+12),0.25,'b')
    if k%2==1: note(k*beat,0.05,N(96),0.05,'m')
fade=SR
for i in range(fade): buf[len(buf)-1-i]*=i/fade
pk=max(abs(x) for x in buf); 
with wave.open('public/musik.wav','w') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(b''.join(struct.pack('<h',int(x/pk*0.8*32767)) for x in buf))
