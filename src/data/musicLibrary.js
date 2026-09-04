// Clean, Authentic Spotify Music Library (No hardcoded personal picks, neutral curation)

export const DEFAULT_ALBUM_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23282828'/%3E%3Ccircle cx='150' cy='150' r='90' fill='%23181818' stroke='%23383838' stroke-width='4'/%3E%3Ccircle cx='150' cy='150' r='35' fill='%23282828'/%3E%3Ccircle cx='150' cy='150' r='10' fill='%231ed760'/%3E%3Cpath d='M140 120v35a12 12 0 1 1-6-10.4V120h22v26a12 12 0 1 1-6-10.4V120h-10z' fill='%23ffffff' opacity='0.7'/%3E%3C/svg%3E"

export const CURATED_SONGS = [
  {
    id: 'kesariya',
    title: 'Kesariya',
    artist: 'Pritam, Arijit Singh',
    album: 'Brahmastra',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg',
    url: 'https://aac.saavncdn.com/871/c2febd353f3a076a406fa37510f31f9f_320.mp4',
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
    id: 'tu_hai_kahan',
    title: 'Tu Hai Kahan',
    artist: 'Swapnil Choudhary',
    album: 'Tu Hai Kahan',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/859/Tu-hai-kahan-Hindi-2023-20231229111509-500x500.jpg',
    url: 'https://aac.saavncdn.com/859/5932b8f911ef56d1bc62b5ef42580e9d_320.mp4',
    duration: '3:45',
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
    id: 'apna_bana_le',
    title: 'Apna Bana Le',
    artist: 'Arijit Singh, Sachin-Jigar',
    album: 'Bhediya',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/238/Romantic-Classics-Hits-Hindi-2026-20260529163838-500x500.jpg',
    url: 'https://aac.saavncdn.com/238/5583fbab6328b12f467f01ee335e496d_320.mp4',
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
    id: 'taylor_lover',
    title: 'Lover',
    artist: 'Taylor Swift',
    album: 'Lover',
    genre: 'Pop',
    theme: 'pop',
    image: 'https://c.saavncdn.com/228/Lover-English-2019-20250731010741-500x500.jpg',
    url: 'https://aac.saavncdn.com/228/a1a7354ee4c329f97c82cfd2b40c9cdc_320.mp4',
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
    id: 'husn',
    title: 'Husn',
    artist: 'Anuv Jain',
    album: 'Husn',
    genre: 'Indie',
    theme: 'indie',
    image: 'https://c.saavncdn.com/436/Husn-Hindi-2023-20231129054140-500x500.jpg',
    url: 'https://aac.saavncdn.com/436/13795b7aa2e87393366162b9e6a6fe88_320.mp4',
    duration: '3:37',
    lyrics: `Dekho dekho kaisi baatein yahan ki
Hai saath par hai saath na bhi
Kya itni aasaan hai yeh judai
Ki khwabon mein bhi ab tu na aayi

Kyun yeh raat itni tanha hai
Kyun yeh dil bas tujhko doondhta hai
Husn tera hai roshni jaisa
Andheron mein bhi jo chamakta hai.`
  },
  {
    id: 'pehla_nasha',
    title: 'Pehla Nasha',
    artist: 'Udit Narayan, Sadhana Sargam',
    album: 'Jo Jeeta Wohi Sikandar',
    genre: 'Classic Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/852/Jo-Jeeta-Wohi-Sikandar-Hindi-1992-500x500.jpg',
    url: 'https://aac.saavncdn.com/852/9d335ee08b26f171a3d65e11f8819d52_sar_320.mp4',
    duration: '4:53',
    lyrics: `Pehla nasha, pehla khumaar
Naya pyaar hai, naya intezaar
Kar loon main kya apna haal
Aye dil-e-bekaraar
Mere dil-e-bekaraar, tu hi bata!

Udta hi firoon in hawaaon mein kahin
Ya main jhool jaaun in ghataon mein kahin
Ek kar doon aasmaan aur zameen
Kaho yaaron kya karoon, kya nahin!`
  },
  {
    id: 'shayad',
    title: 'Shayad',
    artist: 'Pritam, Arijit Singh',
    album: 'Love Aaj Kal',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/862/Love-Aaj-Kal-Hindi-2020-20200214140423-500x500.jpg',
    url: 'https://aac.saavncdn.com/862/e277c1b441b562640c6b264aa3335a83_320.mp4',
    duration: '4:07',
    lyrics: `Shayad kabhi na keh sakoon main tumko
Kahe bina samajh lo tum shayad
Shayad mere khayal mein tum ek din
Milo mujhe kahin pe ghum shayad

Jo tum na ho, rahenge hum nahin
Jo tum na ho, sakenge hum nahin
Na chahiye kuch tumse zyaada, tumse kam nahin!`
  },
  {
    id: 'raataan_lambiyan',
    title: 'Raataan Lambiyan',
    artist: 'Tanishk Bagchi, Jubin Nautiyal, Asees Kaur',
    album: 'Shershaah',
    genre: 'Romantic',
    theme: 'romantic',
    image: 'https://c.saavncdn.com/238/Shershaah-Original-Motion-Picture-Soundtrack--Hindi-2021-20210815181610-500x500.jpg',
    url: 'https://aac.saavncdn.com/238/35726d4394604604e961bf5b846870d0_320.mp4',
    duration: '3:50',
    lyrics: `Teri meri gallan ho gayi mashhoor
Kar na kabhi tu mujhe nazron se door
Kithe chali ae tu dhoop ke kinare
Tere bina dil lagda nahi ve

Kaate kate na re raataan lambiyan lambiyan
Re saware saware sang kaatiyan sang kaatiyan!`
  },
  {
    id: 'until_i_found_you',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    album: 'Until I Found You',
    genre: 'Pop / Retro',
    theme: 'pop',
    image: 'https://c.saavncdn.com/648/Until-I-Found-You-English-2022-20240426130801-500x500.jpg',
    url: 'https://aac.saavncdn.com/648/b4f0c2422d605de887bb72f684ddaa8e_320.mp4',
    duration: '2:58',
    lyrics: `Georgia, wrap me up in all your...
I want ya in my arms
Oh, let me hold ya
I'll never let you go again, like I did
Oh, I used to say

"I would never fall in love until I found her"
I said, "I would never fall unless it's you I fall into"
I was lost within the darkness, but then I found her
I found you.`
  },
  {
    id: 'baarishein',
    title: 'Baarishein',
    artist: 'Anuv Jain',
    album: 'Baarishein',
    genre: 'Indie',
    theme: 'indie',
    image: 'https://c.saavncdn.com/324/Barish-VIbes-Hindi-2026-20260716230015-500x500.jpg',
    url: 'https://aac.saavncdn.com/324/4b7744968a4148bc89669257ef2a7f41_320.mp4',
    duration: '3:27',
    lyrics: `Hawaaon mein bahenge
Ghataon mein rahenge
Tu barkha ban ke aana
Hum baarishein banenge

Tu muskuraaye to
Ruk jaaye yeh samaa
Tere bina kya hai
Yeh saara aasmaan.`
  },
  {
    id: 'study_lofi',
    title: 'Study Lofi Beats',
    artist: 'Lofi Chill Vibes',
    album: 'Music To Sleep Chill To',
    genre: 'Lo-Fi',
    theme: 'lofi',
    image: 'https://c.saavncdn.com/054/Music-To-Put-You-In-A-Better-Mood-Lofi-Hip-Hop-Beats-to-Sleep-Chill-To-Unknown-2023-20250508183531-500x500.jpg',
    url: 'https://aac.saavncdn.com/054/d0421389e10fbca2fcd2a4f47f9e7038_320.mp4',
    duration: '2:50',
    lyrics: `(Soft gentle piano chords & lo-fi vinyl crackle...)
Relaxing lo-fi study beats to unwind and chill.
Search any song to play full music tracks.`
  }
]

export const SPOTIFY_PLAYLISTS = [
  {
    id: 'top_hits',
    title: "Today's Top Hits",
    description: 'The biggest and most popular tracks right now.',
    cover: 'https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg',
    songIds: ['kesariya', 'tu_hai_kahan', 'apna_bana_le', 'taylor_lover', 'until_i_found_you']
  },
  {
    id: 'romantic',
    title: 'Romantic Melodies',
    description: 'Timeless romantic hits and heartfelt vocals.',
    cover: 'https://c.saavncdn.com/238/Romantic-Classics-Hits-Hindi-2026-20260529163838-500x500.jpg',
    songIds: ['kesariya', 'apna_bana_le', 'shayad', 'raataan_lambiyan', 'pehla_nasha']
  },
  {
    id: 'chill_lofi',
    title: 'Lo-Fi & Chill',
    description: 'Peaceful beats for relaxing and unwinding.',
    cover: 'https://c.saavncdn.com/054/Music-To-Put-You-In-A-Better-Mood-Lofi-Hip-Hop-Beats-to-Sleep-Chill-To-Unknown-2023-20250508183531-500x500.jpg',
    songIds: ['study_lofi', 'until_i_found_you', 'baarishein']
  },
  {
    id: 'acoustic_indie',
    title: 'Acoustic & Indie',
    description: 'Stripped-down acoustic strings and raw emotion.',
    cover: 'https://c.saavncdn.com/436/Husn-Hindi-2023-20231129054140-500x500.jpg',
    songIds: ['husn', 'baarishein', 'tu_hai_kahan']
  }
]

export const SEARCH_CHIPS = [
  'Arijit Singh',
  'Taylor Swift',
  'Anuv Jain',
  'Pritam',
  'Atif Aslam',
  'Kesariya',
  'Tu Hai Kahan',
  'Shershaah',
  'AP Dhillon',
  'Until I Found You'
]
