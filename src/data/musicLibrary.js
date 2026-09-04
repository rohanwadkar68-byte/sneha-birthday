// Sneha's Spotify Curated Music Library with Themes, Lyrics & High-Res Covers

export const SPOTIFY_THEMES = {
  noir: {
    id: 'noir',
    name: 'Spotify Noir',
    icon: '🖤',
    bg: '#121212',
    surface: '#181818',
    card: '#242424',
    accent: '#1db954',
    accentText: '#1db954',
    text: '#ffffff',
    textSub: '#b3b3b3',
    border: 'rgba(255, 255, 255, 0.1)',
    gradient: 'linear-gradient(180deg, #222222 0%, #121212 100%)'
  },
  rose: {
    id: 'rose',
    name: 'Strawberry Rose',
    icon: '🌸',
    bg: '#fff0f5',
    surface: '#ffe4ee',
    card: '#ffffff',
    accent: '#f43f5e',
    accentText: '#e11d48',
    text: '#4c0519',
    textSub: '#9f1239',
    border: 'rgba(244, 63, 94, 0.2)',
    gradient: 'linear-gradient(180deg, #ffd1e1 0%, #fff0f5 100%)'
  },
  sunset: {
    id: 'sunset',
    name: 'Lo-Fi Sunset',
    icon: '🌅',
    bg: '#1e162a',
    surface: '#2c1e40',
    card: '#3b2857',
    accent: '#f59e0b',
    accentText: '#fbbf24',
    text: '#ffffff',
    textSub: '#cbd5e1',
    border: 'rgba(245, 158, 11, 0.25)',
    gradient: 'linear-gradient(180deg, #4c1d95 0%, #1e162a 100%)'
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Cloud',
    icon: '💜',
    bg: '#f8f5ff',
    surface: '#ede4ff',
    card: '#ffffff',
    accent: '#8b5cf6',
    accentText: '#7c3aed',
    text: '#2e1065',
    textSub: '#6d28d9',
    border: 'rgba(139, 92, 246, 0.2)',
    gradient: 'linear-gradient(180deg, #ddd6fe 0%, #f8f5ff 100%)'
  }
}

export const CURATED_SONGS = [
  {
    id: 'vilen_chidiya',
    title: 'Chidiya',
    artist: 'Vilen',
    album: 'Darksoul',
    genre: 'Indie Soul',
    theme: 'vilen',
    image: 'assets/3d-emoji/sparkling_heart.png',
    url: 'assets/audio/song-2-chidiya.mp3',
    duration: '3:45',
    isLocal: true,
    lyrics: `Tu aisi chidiya jise aasmaan pasand hai
Khuli hawaon mein udna jise pasand hai

Kaisi hai yeh bechaini, kaisa yeh fitoor hai
Tujhse milke laga jaise tu meri rooh hai

Chhod ke saari duniya ko
Aa ud chalen un baadal pe
Jahan na ho koi shikwa gila
Bas tu ho aur main hoon sang tere

Tu ud ja re panchi, chhoole aasmaan
Ye khula aalam hai tera jahan
Tu ud ja re panchi, chhoole aasmaan
Tere paron mein basa hai karwan.`
  },
  {
    id: 'vilen_kyun',
    title: 'Kyun - Acoustic Special',
    artist: 'Vilen',
    album: 'Acoustic Tales',
    genre: 'Acoustic / Romantic',
    theme: 'vilen',
    image: 'assets/3d-emoji/two_hearts.png',
    url: 'assets/audio/song-1-vilen.mp3',
    duration: '3:30',
    isLocal: true,
    lyrics: `Kyun khamosh baithi ho tum
Kyun palkein jhukaaye ho
Kya baat hai jo keh na saki
Kyun aansu chhupaye ho

Teri aankhon mein jo dard hai
Wo mere dil ko chhoo gaya
Tu muskura de ek dafa
Mera jahan sawar gaya

Tu meri subah, tu meri shaam
Har dua mein sirf tera naam
Kyun darte ho is jahan se
Jab main hoon hamesha tere saath.`
  },
  {
    id: 'cozy_lofi',
    title: 'Cozy Birthday Lo-Fi (Theme)',
    artist: 'Sneha Birthday Mix',
    album: 'Level 23 World',
    genre: 'Chillhop / Lo-Fi',
    theme: 'lofi',
    image: 'assets/3d-emoji/birthday_cake.png',
    url: 'assets/audio/bgm.mp3',
    duration: '2:50',
    isLocal: true,
    lyrics: `(Soft vinyl crackle & sweet piano chords playing...)
♪ Peaceful birthday vibes for Sneha ♪

Another year of pure sweetness
Another year of making everyone smile
May all your deepest wishes blossom
Sit back, breathe, and enjoy your world.

Happy Birthday, Sneha 🧸✨`
  },
  {
    id: 'kesariya',
    title: 'Kesariya',
    artist: 'Arijit Singh, Pritam',
    album: 'Brahmastra',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/274/Brahmastra-Hindi-2022-20220717092834-500x500.jpg',
    url: 'https://aac.saavncdn.com/274/09796e626998634bbad88e63bfa22f18_320.mp4',
    duration: '4:28',
    lyrics: `Kesariya tera ishq hai piya
Rang jaaun jo main haath lagaun
Din beete saara teri fikr mein
Rain saari teri khair manaun

Patjhad ke mausam mein bhi
Rangi chanaaron jaisi
Jhanke sannaaton mein tu
Veena ke taaron jaisi

Sadiyon se bhi lambi yeh
Ratiyan hongi chudailon jaisi
Teri zulfon ki chhaon mein
Bitein shaamein bahaaron jaisi

Kesariya tera ishq hai piya
Rang jaaun jo main haath lagaun!`
  },
  {
    id: 'husn',
    title: 'Husn',
    artist: 'Anuv Jain',
    album: 'Husn',
    genre: 'Indie Pop',
    theme: 'indie',
    image: 'https://c.saavncdn.com/393/Husn-Hindi-2023-20231201043329-500x500.jpg',
    url: 'https://aac.saavncdn.com/393/d1fc46d1bf10ea341e3d36ea1f7fe700_320.mp4',
    duration: '3:38',
    lyrics: `Dekho dekho kaisi baatein yahan ki
Hai saath par hain saath na bhi
Kya itni aasaan hai yeh judai
Ki main yahan aur tu wahan bhi?

Husn tera tauba tauba
Roop tera aafat hai
Tujhe dekh ke lagta hai
Rab ne likhi raahat hai

Par tu sun na saki meri aawaaz ko
Maine dabe paanv pukara tha
Tere husn ke pehre the aise
Ki main khud se bhi haara tha.`
  },
  {
    id: 'tu_hai_kahan',
    title: 'Tu Hai Kahan',
    artist: 'AUR',
    album: 'Tu Hai Kahan',
    genre: 'Romantic Melody',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/366/Tu-Hai-Kahan-Urdu-2023-20231012170327-500x500.jpg',
    url: 'https://aac.saavncdn.com/366/875e533d1c32cfa0c1bfdfbb22c19e5d_320.mp4',
    duration: '4:12',
    lyrics: `Aise kaise ho gaya
Ki tu mujhse door ho gaya
Maine maangi thi dua
Tu hi mera jahan ho gaya

Tu hai kahan, khwaabon ke darmiyan
Main dhoondhta firoon tera nishaan
Tere bina adhoori har subah
Tu laut aa, na kar aur imtihaan.`
  },
  {
    id: 'taylor_lover',
    title: 'Lover',
    artist: 'Taylor Swift',
    album: 'Lover',
    genre: 'Dream Pop',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/152/Lover-English-2019-20190823094828-500x500.jpg',
    url: 'https://aac.saavncdn.com/152/24f3c7e7ffc9a4445582f34da1b6e41b_320.mp4',
    duration: '3:41',
    lyrics: `We could leave the Christmas lights up 'til January
And this is our place, we make the rules
And there's a dazzling haze, a mysterious way about you, dear
Have I known you 20 seconds or 20 years?

Can I go where you go?
Can we always be this close forever and ever?
And ah, take me out, and take me home
You're my, my, my, my... lover!

Ladies and gentlemen, will you please stand?
With every guitar string scar on my hand
I take this magnetic force of a man to be my lover.`
  },
  {
    id: 'apna_bana_le',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh, Sachin-Jigar',
    album: 'Bhediya',
    genre: 'Bollywood Romance',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/264/Bhediya-Hindi-2022-20221105083626-500x500.jpg',
    url: 'https://aac.saavncdn.com/264/3dfdcf6b8f36c1e309cbff1efdbecaa3_320.mp4',
    duration: '4:21',
    lyrics: `Tu mera koi na hoke bhi kuch laage
Tu mera koi na hoke bhi kuch laage

Kiya re jo bhi toone
Kaise kiya re jiya ko mere
Baandh aise liya re

Apna bana le piya, apna bana le piya
Dil ke nagar mein shehar tu basa le piya!`
  },
  {
    id: 'pehla_nasha',
    title: 'Pehla Nasha',
    artist: 'Udit Narayan, Sadhana Sargam',
    album: 'Jo Jeeta Wohi Sikandar',
    genre: 'Evergreen Classic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/241/Jo-Jeeta-Wohi-Sikandar-Hindi-1992-20221105083907-500x500.jpg',
    url: 'https://aac.saavncdn.com/241/9d5a711fe9bc9a7bf0f9d99c4381e3a9_320.mp4',
    duration: '4:51',
    lyrics: `Pehla nasha, pehla khumaar
Naya pyaar hai, naya intezaar
Kar loon main kya apna haal
Aye dil-e-bekaraar
Mere dil-e-bekaraar, tu hi bata

Udta hi phiroon in hawaon mein kahin
Ya main jhool jaaoon in ghataon mein kahin
Ek kar doon aasmaan aur zameen
Kaho yaaron kya karoon!`
  },
  {
    id: 'shayad',
    title: 'Shayad',
    artist: 'Arijit Singh, Pritam',
    album: 'Love Aaj Kal',
    genre: 'Soulful Melody',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/274/Love-Aaj-Kal-Hindi-2020-20200214140418-500x500.jpg',
    url: 'https://aac.saavncdn.com/274/496f8664654b0114f52fa49326e06b3e_320.mp4',
    duration: '4:07',
    lyrics: `Shayad kabhi na keh sakoon main tumko
Kahe bina samajh lo tum shayad
Shayad mere khayal mein tum ek din
Milo mujhe kahin pe ghum shayad

Jo tum na ho, rahenge hum nahin
Na chahiye kuch tumse zyaada
Tumse kam nahin!`
  },
  {
    id: 'raataan_lambiyan',
    title: 'Raataan Lambiyan',
    artist: 'Jubin Nautiyal, Asees Kaur',
    album: 'Shershaah',
    genre: 'Sweet Romance',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack-Hindi-2021-20210815181610-500x500.jpg',
    url: 'https://aac.saavncdn.com/238/5bc608920fae3725db4009bb31f7747e_320.mp4',
    duration: '3:50',
    lyrics: `Teri meri gallan ho gayi mashhoor
Kar na kabhi tu mujhe nazron se door
Kithe chaliye tu kithe chaliye

Kaatun kaise raataan o saawre
Jiya nahi jaata sun bawre
Ke raataan lambiyan lambiyan re
Katein tere sangeyan sangeyan re!`
  },
  {
    id: 'until_i_found_you',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    album: 'Easy On My Eyes',
    genre: 'Vintage Soul / Retro',
    theme: 'lofi',
    image: 'https://c.saavncdn.com/488/Until-I-Found-You-English-2021-20220422051648-500x500.jpg',
    url: 'https://aac.saavncdn.com/488/3ecbcae52bcbaae7620bc2a13f0a5b82_320.mp4',
    duration: '2:57',
    lyrics: `Georgia, wrap me up in all your...
I want you in my arms
Oh, let me hold the love I found

I would never fall in love
Until I found her
I said, "I would never fall, unless it's you I fall into"
I was lost within the darkness, but then I found her
I found you.`
  },
  {
    id: 'baarishein',
    title: 'Baarishein',
    artist: 'Anuv Jain',
    album: 'Baarishein Single',
    genre: 'Acoustic / Rain Vibe',
    theme: 'indie',
    image: 'https://c.saavncdn.com/006/Baarishein-Hindi-2016-20200811164920-500x500.jpg',
    url: 'https://aac.saavncdn.com/006/cf2b07e992982d60f946da978bfdcfb4_320.mp4',
    duration: '3:27',
    lyrics: `Hawaaon mein bahenge
Ghataon mein rahenge
Tu barkha ban ke aana
Hum baarishein banenge

Tu muskuraaye to
Ruk jaaye yeh samaa
Tere bina kya hai
Yeh saara aasmaan.`
  }
]

export const SPOTIFY_PLAYLISTS = [
  {
    id: 'for_sneha',
    title: 'Made For Sneha 💖',
    description: 'The sweetest romantic melodies handpicked for her heart',
    cover: 'assets/3d-emoji/sparkling_heart.png',
    gradient: 'linear-gradient(135deg, #ff7597, #f43f5e)',
    songIds: ['kesariya', 'tu_hai_kahan', 'apna_bana_le', 'taylor_lover', 'shayad', 'raataan_lambiyan']
  },
  {
    id: 'vilen_special',
    title: 'Teddy’s Vilen Vault 🧸',
    description: 'Pure emotions, acoustic guitar strings & poetic depth',
    cover: 'assets/3d-emoji/two_hearts.png',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    songIds: ['vilen_chidiya', 'vilen_kyun', 'husn']
  },
  {
    id: 'lofi_midnight',
    title: 'Late Night Chill & Lo-Fi 🌙',
    description: 'Soft beats to relax, study, or think about good memories',
    cover: 'assets/3d-emoji/glowing_star.png',
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    songIds: ['cozy_lofi', 'until_i_found_you', 'baarishein']
  },
  {
    id: 'classic_nostalgia',
    title: 'Evergreen Love Anthems 💫',
    description: 'Golden romantic classics that never go out of style',
    cover: 'assets/3d-emoji/sparkles.png',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    songIds: ['pehla_nasha', 'kesariya', 'taylor_lover']
  }
]

export const SEARCH_CHIPS = [
  'Arijit Singh',
  'Anuv Jain',
  'Vilen',
  'Taylor Swift',
  'Kesariya',
  'Tu Hai Kahan',
  'Pehla Nasha',
  'Shershaah',
  'Apna Bana Le',
  'Atif Aslam',
  'Until I Found You'
]
