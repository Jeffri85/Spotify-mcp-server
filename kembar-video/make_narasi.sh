#!/bin/bash
# Narasi memakai espeak-ng (suara sintetis, bahasa Indonesia)
cd "$(dirname "$0")"; mkdir -p public/narasi
gen(){ espeak-ng -v id -p "$2" -s "$3" -w "public/narasi/$1.wav" "$4"; }
gen 0 40 180 "Rara dan Rio. Main layang layang."
gen 1 75 185 "Rio, lihat! Layang layangnya tinggi sekali!"
gen 2 30 185 "Ayo kita main sampai sore, Rara!"
gen 3 75 185 "Tapi jangan lupa pulang makan ya!"
gen 4 30 185 "Siap! Hari yang seru!"
for f in public/narasi/*.wav; do echo "$f $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f)"; done
