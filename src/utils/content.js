// =========================================================================
//  💌 SNEHA'S BIRTHDAY WEBSITE — MASTER CONTENT (Character-First Hinglish)
//  Bhai, poori website ka 100% text isi ek file me hai!
//  Kisi code file ko chhoone ki zaroorat nahi hai. Agar aapko koi bhi
//  Saara visible text isi file se control hota hai.
// =========================================================================

// -------------------------------------------------------------------------
// 👑 [SECTION 0] BASIC INFO (Naam, Birthday Date & Nicknames)
// -------------------------------------------------------------------------
export const GIRL = 'Sneha'
export const BIRTH_DATE = '01/09/2003'
export const BIRTH_DATE_PRETTY = '01 September 2003'
export const NICKNAMES = ['mommy', 'dora', 'baccha', 'buddhu']

// -------------------------------------------------------------------------
// ⏳ [SECTION 1] SCENE 0: FAKE LOADING SCREEN
// Ye steps loading bar ke neeche ek-ek karke aate hain (0% se 100% tak).
// -------------------------------------------------------------------------
export const FAKE_LOADING_STEPS = [
  { label: 'Bas thoda sa wait kijiye… birthday girl ke liye kuch mast banaya hai 🎀', pct: 0 },
  { label: '6 mahine ki humari bakbak ka thoda sa record khola ja raha hai… 📱', pct: 20 },
  { label: '12 baje wali entry se 3 baje wali “bas last baat” tak sab check ho raha hai… 🌙', pct: 45 },
  { label: 'Mommy ki cuteness detected… system ko thoda sambhalna pad raha hai 👀', pct: 75 },
  { label: 'Okayyy… sab ready hai meri Dora ke liye. Ab zyada sharmaana mat 😏🧸', pct: 100 }
]
export const FAKE_ERRORS = [
  'Error 23: Birthday girl unnecessarily zyada cute nikli. 😭',
  'Warning: Mommy online hai… ab normal behave karna possible nahi. 🙈',
  'System ko 6 mahine ki bakbak yaad aa gayi… thoda blush mode on ho gaya 👀'
]
export const FAKE_ERROR_FIX = [
  'Haan ji, problem aap hi ho. Itni cute hone ki kya zarurat thi? 😤',
  'Okay, ab system theek hai… mostly. 😌',
  'Chaliye buddhu, ab surprise kholo. Itna curious toh aapko hona hi tha 👀'
]
export const TAUNTS = [
  'arre arre… birthday girl ko itni jaldi kis baat ki hai? 😜',
  'Mommy, button pakadna hai… mujhe nahi. Itna curious kyun ho aap? 🏃‍♀️💨',
  'Dora, aap button se bhaag rahe ho ya button aapse? 😂',
  'Baccha, ek click ke liye itna nakhra… aapko special treatment ki aadat hai kya? 😏',
  'theek hai buddhu, aap jeet gayi. Ab seedha surprise kholo 🎀'
]
export const COMPLIMENTS = [
  {
    emoji: '🎂',
    title: 'Level 23 Unlocked',
    text: 'Aaj Level 23 unlock ho gaya 🎂 aur birthday girl ko officially extra attention milna banta hai. Waise cute toh aap pehle se hi thodi zyada ho.',
    teddyWebm: 0,
    gradient: 'linear-gradient(135deg, #fff0f5 0%, #ffe0ef 100%)'
  },
  {
    emoji: '🎮',
    title: 'That Random Game Lobby',
    text: 'Hum Free Fire me random mile the aur mujhe kya pata tha ki ye random teammate roz ki bakbak ka permanent part ban jayegi 😂🎮',
    teddyWebm: 1,
    gradient: 'linear-gradient(135deg, #eceaff 0%, #ddd6ff 100%)'
  },
  {
    emoji: '🌙',
    title: '12 AM Attendance',
    text: 'Din me kabhi timing match ho ya na ho, raat ke 12 baje dono ki attendance lag hi jaati hai. Phir “bas thodi der” bolke 2:30–3 baje tak bakbak 😭🌙',
    customSticker: 'assets/kisses/cuddle_3.gif',
    gradient: 'linear-gradient(135deg, #fff6e8 0%, #ffe3c2 100%)'
  },
  {
    emoji: '🧸',
    title: 'Gaal Wala Pending Kaam',
    text: 'Aapke chubby gaal ka case abhi pending hai. Kabhi mile toh pehle gaal squish, phir tight hug… aur haan, aapka muh phulna almost guaranteed 😂🙈',
    customSticker: 'assets/kisses/milk_mocha_kiss_3.gif',
    gradient: 'linear-gradient(135deg, #fff2f8 0%, #ffd8ec 100%)'
  },
  {
    emoji: '😤',
    title: 'Mommy Mode',
    text: '“Phone charge lagao.” “Khana khaya?” “Time pe soyiye.” Aapka mommy mode ON hote hi samajh aa jaata hai ki meri class lagne wali hai 😂',
    teddyWebm: 10,
    gradient: 'linear-gradient(135deg, #eafff4 0%, #c9ffe6 100%)'
  },
  {
    emoji: '🎮',
    title: 'Nakhre Department',
    text: 'Game me akele aage bhaagna aur phir bolna “aapne bachaya kyun nahi?” aapki signature move hai. Aur main phir bhi next match me aapke saath aa jaata hoon 😌',
    teddyWebm: 3,
    gradient: 'linear-gradient(135deg, #f4ecff 0%, #e0ccff 100%)'
  },
  {
    emoji: '😏',
    title: 'Tease Alert',
    text: 'Zyada innocent banne ki zarurat nahi hai. Mujhe pata hai aap kitni badi tease ho… phir khud hi sharma ke innocent face bana leti ho. Haan haan, sab pata hai 😏',
    teddyWebm: 22,
    gradient: 'linear-gradient(135deg, #ffeef6 0%, #ffcde4 100%)'
  },
  {
    emoji: '📱',
    title: 'Typing...',
    text: 'Aapka “typing...” dikhna basically late-night bakbak ka official signal hai. Uske baad time ka koi bharosa nahi… 12 se 3 kab ho gaya pata hi nahi chalta 😂',
    customSticker: 'assets/kisses/milk_mocha_kiss_13.gif',
    gradient: 'linear-gradient(135deg, #eef5ff 0%, #d8eaff 100%)'
  },
  {
    emoji: '🙈',
    title: 'Ab Sharma Bhi Lo',
    text: 'Kabhi aapki ek cute si line ke baad aap khud hi sharma jaati ho aur phir aise behave karti ho jaise kuch hua hi nahi. Aapko lagta hai mujhe pata nahi chalta? 😏🎀',
    customSticker: 'assets/kisses/milk_mocha_kiss_5.gif',
    gradient: 'linear-gradient(135deg, #fff8e8 0%, #ffe9c8 100%)'
  },
  {
    emoji: '🎀',
    title: 'Happy Birthday Baccha',
    text: 'HAPPY BIRTHDAY, Sneha!! 🎂 Aaj 23 ki ho gayi hain, lekin meri cute si Dora ki buddhu-baccha category permanently reserved hai. Hamesha aise hi hasti rehna 🧸🎀',
    teddyWebm: 4,
    gradient: 'linear-gradient(135deg, #ffd9e8 0%, #e6dbff 100%)'
  }
]
export const PICKUP_LINES = [
  'Aapko banane me kaafi mehnat lagi hogi… details kuch zyada hi cute hain 😏🎂',
  'Aapke chubby gaal dekhke bas ek hi thought aata hai… ye kab squish karne milenge? 🙈',
  'Thoda kam cute behave kiya karo, aapse baat karte waqt mera focus already weak hai 😭😏',
  'Aap muh phula ke bhi cute lagti ho… isi liye main aapko tang karta rehta hoon 😂',
  'Game me random mile the aur ab dekho… raat ki 12 baje wali attendance compulsory ho gayi 🎮🌙',
  'Zyada innocent mat bano mommy, mujhe aapki teasing ka pura record yaad hai 😏',
  'Aap “good night” bolke phir 20 minute aur baat karti ho… mujhe pata hai ye trick 😭',
  'Aapko blush karte dekhna easy hai… bas thoda sa tease karna padta hai 😌🎀'
]
export const COMPLIMENT_GRADIENTS = [
  'linear-gradient(135deg, #fff0f5 0%, #ffe0ef 100%)',
  'linear-gradient(135deg, #eceaff 0%, #ddd6ff 100%)',
  'linear-gradient(135deg, #fff6e8 0%, #ffe3c2 100%)',
  'linear-gradient(135deg, #eafff4 0%, #c9ffe6 100%)',
  'linear-gradient(135deg, #f4ecff 0%, #e0ccff 100%)',
  'linear-gradient(135deg, #ffeef6 0%, #ffcde4 100%)'
]

// -------------------------------------------------------------------------
// 📔 [SECTION 6] SCENE 11: SCRAPBOOK POLAROID MEMORIES
// Ye scrapbook me polaroid cards hain. Card par click karne se piche ka
// 'secretNote' (secret handwritten note) flip hokar dikhta hai!
// -------------------------------------------------------------------------
export const MEMORIES = [
  {
    tape: '#ffd3e2', rot: -3, emoji: '🎂',
    title: 'Level 23 Ki Entry',
    text: '23 ho gayi madam 🎂 Ab birthday ke din thoda zyada nakhra allowed hai… bas thoda.',
    secretNote: 'Secret: Age badh rahi hai, lekin mere liye aapki buddhu-baccha wali category bilkul same hai 😂🧸',
    deco: 'star', customSticker: 'assets/kisses/milk_mocha_kiss_1.webm', pookieIdx: 1, tag: 'Chapter 23'
  },
  {
    tape: '#d9ecff', rot: 2.5, emoji: '🎮',
    title: 'Woh Random Game',
    text: 'Free Fire me bas ek random teammate mile the… phir pata nahi kab daily wali chatting start ho gayi 😂',
    secretNote: 'Secret: Agar us din woh match nahi hota toh ye 12–3 AM wali bakbak bhi nahi hoti. Kaafi mast plot twist tha 😏🎮',
    deco: 'heart', pookieIdx: 21, tag: 'Player 1 & 2'
  },
  {
    tape: '#fff3c9', rot: -2, emoji: '🌙',
    title: '12 Se 3 Tak',
    text: 'Game kab ka khatam, lekin baatein nahi. “Bas thodi der” se seedha 2:30–3 baje tak pahunch jaana apni specialty hai 😂🌙',
    secretNote: 'Secret: Aap “neend aa rahi hai” bolti ho aur phir khud hi next topic nikaal deti ho. Main samajh jaata hoon… aaj bhi jaldi sona cancel 😭',
    deco: 'flower', customSticker: 'assets/kisses/cuddle_3.gif', pookieIdx: 12, tag: '12 AM Club'
  },
  {
    tape: '#e2dcff', rot: 3, emoji: '🧸',
    title: 'Pending Gaal Squish',
    text: 'Abhi tak sirf virtual bakbak aur cuddles… real meeting wala gaal-squish mission abhi pending hai 🙈',
    secretNote: 'Secret: First meeting ka unofficial rule: pehle proper hug, phir gaal squish. Complaint baad me sunenge 😤🧸',
    deco: 'bow', customSticker: 'assets/kisses/milk_mocha_kiss_3.gif', pookieIdx: 42, tag: 'Pending Mission'
  },
  {
    tape: '#ffe0ef', rot: -2.5, emoji: '📱',
    title: 'Chat Archive',
    text: 'Funny screenshots, random messages, chhoti fights aur phir normal ho jaana… kaafi bada archive ban gaya hai 📩😂',
    secretNote: 'Secret: Hum dono ek hi conversation me 5 alag topics kaise start kar dete hain, ye abhi tak samajh nahi aaya 😭📱',
    deco: 'sparkle', pookieIdx: 41, tag: 'Cute Chats'
  },
  {
    tape: '#d9f6e8', rot: 2, emoji: '😏',
    title: 'Nakhre + Teasing',
    text: 'Kabhi aapka muh phulna, kabhi meri taang khinchai, kabhi dono ka random cute mode… normal rehna shayad humse hota hi nahi 😂',
    secretNote: 'Secret: Jagda 10 minute ka ho sakta hai, lekin next baat phir waise hi start ho jaati hai jaise kuch hua hi nahi. Buddhu dono taraf se hain 😌',
    deco: 'cloud', customSticker: 'assets/kisses/milk_mocha_kiss_13.gif', pookieIdx: 15, tag: 'Us Being Us'
  }
]
export const LOVE_COUPONS = [
  {
    id: 1, icon: '🧸',
    title: 'Gaal Squish & Hug Pass',
    desc: 'Kabhi real me mile toh pending gaal squish + tight hug. Is pass ki koi expiry nahi 😌',
    stamp: 'HAMESHA VALID',
    customSticker: 'assets/kisses/milk_mocha_kiss_3.gif',
    color: 'linear-gradient(135deg, #ffd9e8 0%, #ff85a8 100%)'
  },
  {
    id: 2, icon: '🍦',
    title: 'Late Night Treat Pass',
    desc: 'Ice cream, chocolate ya favourite treat ka mood ho toh mommy ke order ko seriously lena padega 😤🍦',
    stamp: 'ON-DEMAND',
    customSticker: 'assets/kisses/cuddle_5.gif',
    color: 'linear-gradient(135deg, #fff3c9 0%, #ffcb45 100%)'
  },
  {
    id: 3, icon: '👑',
    title: 'Mommy Is Always Right Pass',
    desc: 'Mommy 100% sahi hain. Khaas kar jab woh mujhe phone charge ya khana khane ke liye daant rahi hoti hain. No arguments 😭',
    stamp: 'VIP MOMMY ONLY',
    customSticker: 'assets/kisses/bubu_kiss_5.gif',
    color: 'linear-gradient(135deg, #e6dbff 0%, #a855f7 100%)'
  }
]
export const LETTER_REASSURANCE = {
  title: 'Kisi bhi cheez ki overthinking nahi karni, baccha. 🧸',
  subtitle: 'Bas jo ab aane wala hai na… araam se padhna.',
  tease: 'Zyada sochna mana hai 😤',
  openBtn: '💌 Pehla Letter Kholo'
}

export const LETTER_LINES = [
  'Dear Sneha (meri mommy, meri Dora, mera baccha),',
  '',
  'HAPPY BIRTHDAY!! 🎂✨',
  '',
  'Pata hai, 6 mahine pehle Free Fire me ek random game se shuru hua tha sab. Tab bas game khelna tha. Phir chatting start hui, phir daily chatting, aur ab ye haal hai ki raat ke 12 baje ke baad aapki entry almost fixed hai. 😂',
  '',
  'Din me kabhi baat ho, kabhi na ho, lekin raat ko dono aa hi jaate hain. Game kabhi hota hai, kabhi sirf bakbak. Phir “bas 5 minute aur” bolte-bolte 2:30–3 baj jaate hain. Aap bhi kam buddhu nahi ho, warna itni der tak mere saath kaun baithta. 😭',
  '',
  'Beech me chhote jagde, muh phulana, ek dusre ko buddhu bolna… aur phir thodi der baad bilkul normal. Ye humari ajeeb si routine ban gayi hai aur honestly mujhe ye routine kaafi acchi lagti hai.',
  '',
  'Aur mommy mode toh alag hi level hai. “Phone charge lagao”, “khana khaya?”, “time pe soyiye” — aapki ye daant bhi ab familiar si lagti hai. 😌',
  '',
  'Aur haan, virtual cuddles, kisses aur aapki woh teasing… uska toh main kuch bolunga hi nahi. Aap khud samajh jaogi aur phir sharmaogi. 😏🙈',
  '',
  'Kabhi real me mile na, toh pehle se bata raha hoon: gaal squish pending hai aur tight hug bhi. Aap muh phula sakti ho, escape nahi. 😂🧸',
  '',
  'Bas birthday pe ek cheez: aise hi rehna. Hasti rehna, apne nakhre karna, mujhe tang karna aur kabhi kabhi mommy mode on karke meri class lena. 🎀',
  '',
  'Happy Birthday, Dora. 23 ka level mast se enjoy karo. 🎂',
  '',
  '— aapka permanent bakbak partner 😌',
  '',
  'P.S. Agar ye padhke aap blush kar rahi ho na… haan, wahi toh chahiye tha mujhe. 😏🎀'
]

export const LETTER_1_LYRICS = [
  { text: 'Oo Re Panchi 🩶', time: 0.0 },
  { text: 'Kyu Humesha 🤍', time: 4.2 },
  { text: 'Baithi Muh Latkaaye Re 🤍', time: 7.8 },
  { text: 'Teri. Ankhon Jo Nam Hai 🤍', time: 12.2 },
  { text: 'Inme mai Jo Gham Hai 🤍', time: 16.5 },
  { text: 'Chor Ke Subha Pe 🤍', time: 20.8 },
  { text: 'Kar yakeen 🤍', time: 25.0 },
  { text: 'Ho Ye Jhumta Savan Hai 🤍', time: 29.2 },
  { text: 'Meethi jo Pavan Hai 🤍', time: 34.0 },
  { text: 'Teri Hi Muskan Se Bani 🤍', time: 39.5 }
]

export const LETTER_TRANSITION = {
  line1: 'Baccha… ruko.',
  line2: 'Abhi ek aur hai. 😏',
  line3: 'Ek aur hai aapke liye…',
  openBtn: '💌 Kholiye'
}

export const LETTER_2_LINES = [
  'Waise ek aur baat bolun madam? 😏',
  '',
  'Aapko lagta hai aap bohot innocent ho na? “Maine kya kiya?” bolke jo cute face banati ho na aap… mujhe sab pata hai aap kitni badi tease ho! 😂',
  '',
  'Game me akele aage bhaag jana, fir knock hone ke baad mujhe daantna ki “bachaya kyu nahi?”, raat ko “good night” bolke 20 minute aur bakbak karna, aur fir subah bolna “neend nahi poori hui” — ye sab aapki signature tricks hain.',
  '',
  'Lekin sach bolu toh, aapki yehi saari masti, aapka wo mommy mode daantna aur aapke nakhre hi meri din bhar ki thakan mita dete hain.',
  '',
  'First meeting ka rule yaad hai na? 10 minute non-stop gaal squish aur hug pending hai… complaint baad me sununga 😤🧸',
  '',
  'Chalo ab smile karo… mast wali 😌',
  'Aaj ka poora din aapka hai. 23 ka level mast se enjoy karo!',
  '',
  'HAPPY BIRTHDAY, SNEHA!! 🧸🎂💖'
]

export const LETTER_2_LYRICS = [
  { text: '..Aaj mil gyi....', time: 0.0 },
  { text: 'Ye Zamana Beshrm hai 🩶', time: 3.8 },
  { text: 'Na isska dharam hai 🩶', time: 7.2 },
  { text: 'Kyu dhoonde hai tu isme bandhagi 🩶', time: 10.5 },
  { text: 'Oo tere sath tera man hai. Dil ki dhadkan hai 🩶', time: 14.5 },
  { text: 'Age badhke jile zindagi 🩶', time: 18.2 }
]
export const CAT_BREAKS = [
  { cat: 'cute', caption: 'meow break! mommy ko itna cute dekhke billi bhi thoda blush kar rahi hai 🐾🎀' },
  { cat: 'smug', caption: 'pata hai aap cute ho… ab zyada hawa me mat udna 😼😏' },
  { cat: 'sleepy', caption: '12 se 3 tak chat karne walon ko billi bhi bol rahi hai: so jao buddhu 😴🐱' },
  { cat: 'dramatic', caption: 'aage jo hai uske liye ready ho mommy? Aur haan… sharmaana allowed hai 👀' }
]
export const EXPLORER_PROPS = [
  { id: 'star', emoji: '⭐', left: '10%', top: '14%', label: 'Midnight Star', blip: 520, line: '12 baje ke baad wali humari bakbak ka official star 🌟' },
  { id: 'flower', emoji: '🌸', left: '48%', top: '8%', label: 'Dora Flower', blip: 580, line: 'Dora online = bakbak automatically ON 🌷😂' },
  { id: 'cloud', emoji: '☁️', left: '80%', top: '16%', label: 'Sleepy Cloud', blip: 640, line: '2:30 AM ke baad “neend aa rahi hai” wala cloud ☁️🌙' },
  { id: 'sparkle', emoji: '✨', left: '22%', top: '46%', label: 'Tease Sparkle', blip: 700, line: 'Aapki teasing ka chhota sa dangerous sparkle 😏✨' },
  { id: 'balloon', emoji: '🎈', left: '76%', top: '48%', label: 'Gaal Squish Token', blip: 760, line: 'Pop!! Ek pending gaal-squish token mil gaya 🎈🧸' },
  { id: 'note', emoji: '🎵', left: '12%', top: '72%', label: 'Typing Note', blip: 820, line: 'Aapka “typing...” = raat ki bakbak ki ringtone 🎶' },
  { id: 'moon', emoji: '🌙', left: '50%', top: '74%', label: '12 AM Moon', blip: 880, line: 'Jab sab so rahe hote hain aur hum dono abhi bhi bakbak kar rahe hote hain 🌙' },
  { id: 'heart', emoji: '🎀', left: '84%', top: '76%', label: 'Birthday Ribbon', blip: 940, line: 'Birthday girl ke liye ek extra cute ribbon 🎀' }
]
export const FINALE_LETTERS = ['HAPPY', 'BIRTHDAY']

// -------------------------------------------------------------------------
// 💖 [SECTION 11] SCENE 15: FINAL MESSAGE (Grand Finale Ke Baad Ka Message)
// -------------------------------------------------------------------------
export const FINAL_MESSAGE = [
  'Toh… birthday girl. 😏🎀',
  '6 mahine pehle game me random mile the aur ab dekho, raat ki 12 baje wali attendance bhi saath me lagti hai.',
  'Kabhi game, kabhi bakbak, kabhi jagda, kabhi muh phulana… aur phir 10 minute baad dono normal. 😂',
  'Aap meri favourite Dora, mommy aur buddhu baccha ho. Ye title koi aur le nahi sakta. 🧸',
  'Happy Birthday Sneha!! 🎂✨ Ab 23 ka level enjoy karo… aur haan, aaj blush karna allowed hai. 😏'
]
export const SECRET_REWARD = {
  title: 'SECRET UNLOCKED 🔓',
  body: 'Aapne dhund hi liya! Obviously… meri baat thodi na sunti ho aap 😂 Reward: ek unlimited gaal-squish pass, late-night bakbak ka lifetime quota, aur jab kabhi milenge tab ek extra tight hug. 🎁🧸',
  teddy: 'happy'
}
export const WELCOME_CONTENT = {
  crownBadge: '🎀 SPECIAL SURPRISE FOR MY FAVOURITE BUDDHU 🎀',
  title: 'Hey Mommy, Aao Dekho! 👋🎀',
  subtitle: 'Aapke birthday ke liye ek chhota sa surprise banaya hai… zyada sharmaana mat 😏',
  doorClosed: 'Magic Door Kholo 🔑',
  doorClosedSub: 'Tap kijiye, birthday girl',
  doorOpen: 'Door Khul Raha Hai… 🌟',
  doorOpenSub: 'Aapki little birthday duniya me entry…',
  ctaBtn: '🚪 Magic Door Unlock Karein ✨'
}
export const RUNAWAY_CONTENT = {
  heading: 'Pakad Ke Dikhao! 😜',
  subtitle: 'Aap itni asani se aage nahi ja sakti… pehle button pakdo, mommy 🏃‍♀️💨',
  caughtBtn: 'Aap Jeet Gayi! Ab asli surprise kholo 🎁✨'
}
export const FAKE_GIFT_CONTENT = {
  heading: 'Ek Special Parcel Aaya Hai! 📦',
  subtitle: 'Birthday girl ke liye kuch aaya hai… tap karke unbox karein',
  boxClosed: 'Tap to Open Parcel 🎀',
  boxOpen: 'Unboxing… thoda suspense bhi toh banta hai ✨',
  revealedTitle: 'Birthday Delivery!',
  revealedBody: 'Aapke liye cake, cute teddy aur thodi si meri bakbak 🎂🧸',
  nextBtn: 'Surprise Shuru Karein →'
}
export const EXPLORER_CONTENT = {
  heading: 'Dora Ka Little Wonderland 🏰',
  subtitle: '8 chhoti-chhoti cheezein chhupi hain… sab dhoondh ke dikhaiye 😏',
  progressLabel: 'Dora Ne Kitna Dhoonda:',
  allFoundBanner: 'Sab mil gaya! Wah buddhu, aap expected se zyada smart nikli 😭✨',
  nextBtn: 'Ab Cute Cards Khologe? 🃏✨'
}
export const COMPLIMENTS_UI = {
  heading: 'Thoda Sa Blush Kariye 🎀',
  subtitle: 'Har card me aapke liye ek baat hai… aur haan, kuch cards jaan-bujhkar sharmaane wale hain 😏',
  counter: 'Card {current} of {total}',
  nextBtn: 'Next Card →',
  finishBtn: 'Bas bas… ab itna blush kaafi hai 😭🧸'
}
export const KISS_CEREMONY_CONTENT = {
  title: '🧸 The Cute Little Affection Ritual',
  step1: {
    prompt: 'Mommy, pehle left gaal idhar kijiye na… pending hai 🥺',
    actionBtn: 'Left Gaal Do 👈🧸',
    reaction: 'Hehe… left gaal officially squished. Ab bhaagna mat 😌'
  },
  step2: {
    prompt: 'Ab right gaal ki baari… unfair nahi chalega 😏',
    actionBtn: 'Right Gaal Do 👉🧸',
    reaction: 'Right side bhi done. Ab dono gaal safe nahi hain 😭🙈'
  },
  step3: {
    prompt: 'Ab aankhein band kijiye… ek soft forehead kiss banti hai 🎀',
    actionBtn: 'Aankhein Band Karo 🙈✨',
    reaction: 'Bas ek cute birthday kiss. Ab itna blush kyun kar rahi hain aap? 😏'
  },
  step4: {
    prompt: 'Ab final choice… dekhein birthday girl kitni brave hain 👀',
    options: [
      'Ek aur cheek squish 🧸',
      'Cute forehead kiss 🙈',
      'Nose pe boop 👃',
      'Ek tight warm hug 🤗'
    ],
    revealDialog: 'Ayy hayy… choice dekhke hi sharma gayi? 😭😏 Theek hai, final reward locked. Ab innocent banne ki acting mat karna, Dora.',
    finishBtn: 'Okayyy, Ab Aage Chalein 🙈✨'
  }
}
export const SCRATCH_UI = {
  heading: 'Secret Birthday Passes 🎟️',
  subtitle: '3 passes hain… scratch karke dekhiye aapko kya milta hai 😏',
  nextBtnUnlocked: 'Sab Passes Claim! Ab Scrapbook Dekhein 📔✨',
  nextBtnLocked: 'Aage Chalein →'
}
export const SCRAPBOOK_UI = {
  heading: 'Humari Chhoti Chhoti Stories ⏳',
  subtitle: 'Ek random game se 12–3 AM wali daily bakbak tak 🎀',
  flipHint: 'Polaroid tap kijiye… peeche secret note hai 👀',
  nextBtn: 'Khaas Chitthi Padhein 💌✨'
}
export const LETTER_UI = {
  heading: 'Aapke Naam Ek Khaas Chitthi 💌',
  waxSealTip: 'WAX SEAL • TAP TO OPEN',
  finishBtn: 'Bas ab cake ka number hai 🎂✨'
}
export const CAKE_UI = {
  badge: 'SPECIAL BIRTHDAY CAKE FOR SNEHA',
  plaque: '🎀 SNEHA • LEVEL 23 🎀',
  blowTapBtn: '💨 Tap To Blow Candle',
  blowMicBtn: 'Mic Se Phooko 🎤',
  cutBtn: '🔪 Golden Knife Se Cake Cut Karein ✨',
  slicedBite0: '🍰 Cake cut ho gaya! Pehla bite birthday girl ka 🤤',
  slicedBite1: '🎉 Smile aa gayi? Ek aur bite banta hai 😋',
  slicedBite2: '✨ Perfect! Ab final surprise ki baari 🎀',
  nextBtn: 'Grand Finale Dekhein 🎆✨'
}
export const FINALE_UI = {
  heading: 'HAPPY BIRTHDAY SNEHA! 🎀🎉',
  subtitle: 'Level 23 Unlocked • Ab officially aur zyada nakhre allowed 😌',
  replayBtn: 'Surprise Phir Se Dekhein ↺',
  finalLove: 'Aapka Permanent Bakbak Partner — Player 2 🧸'
}
export const HUD_UI = {
  dontClick: '🤫 mujhe mat dabao'
}

// -------------------------------------------------------------------------
// 🧸 [SECTION 14] SCENE 8: OUR LITTLE WORLD (2-Teddy Virtual Room)
// -------------------------------------------------------------------------
export const LITTLE_WORLD_CONTENT = {
  intro: {
    badge: '🧸 OUR LITTLE WORLD 🌙',
    title: 'Ek Chhoti Si Pyaari Jagah…',
    subtitle: 'Jahan bas Player 1 aur Player 2 hain ✨',
    btn: 'Enter Little World →'
  },
  clockMilestones: [
    { time: '11:59 PM', label: 'Player 1 waiting in room…' },
    { time: '12:00 AM', label: 'Player 2 (Sneha) aa gayi! 🌸' },
    { time: '12:03 AM', label: 'Game lobby on… 🎮' },
    { time: '12:12 AM', label: 'Game se zyada bakbak mode! 💬' },
    { time: '01:18 AM', label: 'Late night treat time 🍦' },
    { time: '02:04 AM', label: 'Dono sleepy mode me… 🥱' },
    { time: '02:36 AM', label: '“Bas last 5 minute aur…” 🙈' },
    { time: '03:01 AM', label: 'Signature cozy 3 AM cuddle 🫂🌙' }
  ],
  storyDialogues: {
    waiting: 'Player 1 sofa par wait kar raha hai…',
    enter: { p1: 'Aa gayi? 👀', p2: 'Haan… 😌' },
    gameOffer: { p1: 'Game khelein? 🎮', p2: 'Rehne do… aaj bas baatein karte hain 💬' },
    gameCancelBanner: 'GAME: ❌  BAKBAK: ✅',
    chatMessages: [
      { time: '12:03 AM', from: 'p1', text: 'Aap kya kar rahi hain?' },
      { time: '12:08 AM', from: 'p2', text: 'Bas…' },
      { time: '12:09 AM', from: 'p1', text: 'Bas kya? 😂' },
      { time: '12:11 AM', from: 'p2', text: 'Baitho na chupchap 🙈' }
    ],
    muhPhulana: {
      p2Action: '😤',
      p1: 'Acha ji? Itna muh kyu phulaya hai? 😏',
      p2: 'Hmph… baat nahi karni 🙄',
      p1Gift: 'Yeh lo pillow aur treat… ab smile karo na 🥺',
      system: 'muh_phulana.exe has stopped responding 😂'
    },
    cuddle3am: {
      p1: 'Bas… ab jaa rahe hain? 🥺',
      p2: 'haan… 🥱',
      p1Again: 'bas 5 minute aur… 🧸',
      p2Accept: 'haan, bas 5 minute aur… 💖'
    }
  },
  petControls: {
    feed: [
      'Mmm… aur milega? 🥺🍰',
      'Aap mujhe bigaad rahe ho 😂',
      'Bas… ab pet full ho gaya 😋💖'
    ],
    cuddle: [
      'Idhar aaiye na… 🧸',
      'Bas 5 minute cuddle time 🙈💖',
      'Aap sabse soft aur cozy ho 🥺❤️'
    ],
    gift: [
      'Aapke liye ek chhota sa birthday surprise 🎁',
      'Aww… itna cute gift! 😭💖',
      'Bas accha hai? — Haan, bohot zyada! 🙈✨'
    ],
    sleep: {
      dialogue: [
        'Jaa rahi hain?',
        'Haan.',
        'Achaaa…',
        'Waise…',
        'Haan bolo.'
      ],
      systemNote: 'Sleep cancelled. Bakbak continues. 😂🌙'
    }
  },
  nextBtn: 'Ab Cute Compliments Khologe? 🃏✨'
}
