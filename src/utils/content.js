// =========================================================================
//  💌 SNEHA'S BIRTHDAY WEBSITE — MASTER CONTENT (Hinglish Guide)
//  Bhai, poori website ka 100% text isi ek file me hai!
//  Kisi code file ko chhoone ki zaroorat nahi hai. Agar aapko koi bhi
//  line, card, letter ya button ka text change karna ho toh direct yahan karein!
// =========================================================================

// -------------------------------------------------------------------------
// 👑 [SECTION 0] BASIC INFO (Naam, Birthday Date & Nicknames)
// -------------------------------------------------------------------------
export const GIRL = 'Sneha'
export const BIRTH_DATE = '01/09/2003'
export const BIRTH_DATE_PRETTY = '01 September 2003'
export const NICKNAMES = ['mommy', 'dora', 'baccha']

// -------------------------------------------------------------------------
// ⏳ [SECTION 1] SCENE 0: FAKE LOADING SCREEN
// Ye steps loading bar ke neeche ek-ek karke aate hain (0% se 100% tak).
// -------------------------------------------------------------------------
export const FAKE_LOADING_STEPS = [
  { label: 'Bas thoda sa wait kijiye…', pct: 0 },
  { label: 'Aapke liye ek chhota sa surprise load ho raha hai…', pct: 20 },
  { label: 'Humari saari chats aur pyaari yaadein collect kar raha hoon…', pct: 45 },
  { label: 'Sneha ji, screen dekh ke zyada sharmaana mat 👀', pct: 75 },
  { label: 'Sab ready hai meri sabse favourite ladki ke liye! 💖', pct: 100 }
]

// -------------------------------------------------------------------------
// ⚠️ [SECTION 2] SCENE 1: FAKE ERROR SCREEN (Mazedaar System Errors)
// Loading ke baad jo fake error popup aata hai jise Sneha 'Retry' karke theek karegi.
// -------------------------------------------------------------------------
export const FAKE_ERRORS = [
  'Warning: Sneha ko dekh kar dil ka dhadakna tez ho gaya hai.',
  'Aap itni cute lagti ho ki aage ka page hi load nahi ho raha 🙈',
  'Bas 2 second rukiye… aapke liye special surprise khul raha hai'
]

// Error fix hone ke baad ka dialog
export const FAKE_ERROR_FIX = [
  'aap hi ho — world ki sabse pyaari ladki.',
  'ab seedha aage badhte hain ✅',
  'chalo ab masti band, seedha aapke surprise par aate hain 😤💖'
]

// -------------------------------------------------------------------------
// 🏃‍♀️ [SECTION 3] SCENE 3: RUNAWAY BUTTON (Bhaagne Wala Button)
// Jab Sneha button ko click karne ki koshish karegi aur button bhaagega,
// tab ye dialogue screen par ek-ek karke aayenge.
// -------------------------------------------------------------------------
export const TAUNTS = [
  'arre arre, itni jaldi? pehle game lobby me pakad ke dikhaiye 😜',
  'kaha bhaag rahi hain aap, mommy? thoda rukiye na 🏃‍♀️💨',
  'dora, itna sharma ke kyu bhaag rahi ho? 😌',
  'baccha, ek click hi toh tha… ab toh gaal kheench ke pakadna padega 😭',
  'theek hai theek hai… aap jeet gayi. hamesha aap hi jeet ti ho meri jaan 🥺'
]

// -------------------------------------------------------------------------
// 🃏 [SECTION 4] SCENE 8: 10 COMPLIMENT PHOTOCARDS (Why You Are Special)
// Ye 10 cards hain jisme romantic, gaming, late-night chats aur cute feelings hain.
// Har card ka 'title' aur 'text' aap yahan se change kar sakte hain.
// -------------------------------------------------------------------------
export const COMPLIMENTS = [
  {
    emoji: '👑',
    title: 'Level 23 Unlocked 🎮', // Card 1 Title
    text: 'Game me kitne bhi matches khele hon, par meri favourite teammate ka Level 23 unlock hona sabse special hai. Har guzarate din ke sath aap aur bhi zyada gorgeous aur pyaari lagti ho 👑💖',
    teddyWebm: 0,
    gradient: 'linear-gradient(135deg, #fff0f5 0%, #ffe0ef 100%)'
  },
  {
    emoji: '🎮',
    title: 'Game Lobby Wali Kahaani', // Card 2 Title
    text: 'kisine sach hi kaha hai ki acche log achanak milte hain. Hum ek game me mile the aur aaj meri din bhar ki shuruat aur raat aapke text ke bina poori nahi hoti 🥺✨',
    teddyWebm: 1,
    gradient: 'linear-gradient(135deg, #eceaff 0%, #ddd6ff 100%)'
  },
  {
    emoji: '🤤',
    title: 'Chubby Gaal Aur Hugs', // Card 3 Title
    text: 'aapke gaal itne soft hain na ki jab hum milenge, pehle 10 minute tak bina ruke aapke gaal squish karunga aur ek tight hug dunga… koi bahana nahi chalega 🙈🤤',
    customSticker: 'assets/kisses/milk_mocha_kiss_3.gif',
    gradient: 'linear-gradient(135deg, #fff2f8 0%, #ffd8ec 100%)'
  },
  {
    emoji: '💬',
    title: 'Late Night Sukoon Bhari Baatein', // Card 4 Title
    text: 'din bhar chahe kitna bhi shor ho, raat ko aapse akele me baat karke dil ekdum shaant ho jaata hai. Wo screen par aapka "typing..." dekh ke chehre par alag hi smile aa jaati hai 💖',
    customSticker: 'assets/kisses/cuddle_3.gif',
    gradient: 'linear-gradient(135deg, #fff6e8 0%, #ffe3c2 100%)'
  },
  {
    emoji: '🛡️',
    title: 'Aapka Wo Daant Lagana', // Card 5 Title
    text: 'jab aap bolti ho na ki “phone charge lagao, khana khaya time pe?”, mujhe sach me bohot accha lagta hai. Aise hi hamesha haq jatati rehna 😌💖',
    teddyWebm: 10,
    gradient: 'linear-gradient(135deg, #eafff4 0%, #c9ffe6 100%)'
  },
  {
    emoji: '🐹',
    title: 'Nakhre Aur Pyaari Zid', // Card 6 Title
    text: 'game me akele aage bhaag jaana aur fir mujhe bolna “aapne bachaya kyu nahi?!” chahe jitna bhi tang kar lo, sabse pyari aap hi lagti ho 😌',
    teddyWebm: 3,
    gradient: 'linear-gradient(135deg, #f4ecff 0%, #e0ccff 100%)'
  },
  {
    emoji: '💫',
    title: 'Mera Sharma Jaana', // Card 7 Title
    text: 'aap jab bhi thoda sa pyaar se baat karti ho ya “meri jaan” bolti ho, mera saara cool attitude 1 second me gayab ho jaata hai aur main chup-chaap blush karne lagta hoon 💙',
    teddyWebm: 22,
    gradient: 'linear-gradient(135deg, #ffeef6 0%, #ffcde4 100%)'
  },
  {
    emoji: '🫶',
    title: 'Dil Ke Sabse Paas', // Card 8 Title
    text: 'chahe hum dono door hain aur abhi tak bas chat pe hi baat hui hai, par sach me mere dil ke sabse kareeb aap hi ho. Aapka har text mere liye bohot khaas hai.',
    customSticker: 'assets/kisses/milk_mocha_kiss_13.gif',
    gradient: 'linear-gradient(135deg, #eef5ff 0%, #d8eaff 100%)'
  },
  {
    emoji: '📱',
    title: 'Humari Secret Baatein', // Card 9 Title
    text: 'raat ko ghanto tak aapse ajeeb-ajeeb baatein karna, maze lena aur hasna… meri har din ka sabse best part hota hai 📱✨',
    customSticker: 'assets/kisses/milk_mocha_kiss_5.gif',
    gradient: 'linear-gradient(135deg, #fff8e8 0%, #ffe9c8 100%)'
  },
  {
    emoji: '🎂',
    title: 'Happy Birthday Meri Baccha', // Card 10 Title
    text: 'HAPPY BIRTHDAY, Sneha!! Mere liye aap hamesha wahi sabse cute aur special baccha rahogi. Hamesha aise hi khush aur hasti rehna 🎉❤️',
    teddyWebm: 4,
    gradient: 'linear-gradient(135deg, #ffd9e8 0%, #e6dbff 100%)'
  }
]

// -------------------------------------------------------------------------
// 💬 [SECTION 5] FLIRTY PICKUP LINES & BLUSH QUOTES
// -------------------------------------------------------------------------
export const PICKUP_LINES = [
  'bhagwan ne sach me fursat me banaya hai aapko 🎂💫',
  'aap itni pyaari lagti ho na ki man karta hai gaal kheench ke rakh loon 🙈💖',
  'thoda kam cute laga karo, aapse baat karte waqt focus nahi rehta 😏',
  'aapka gusse me bolna bhi itna pyara lagta hai ki man karta hai roz tang karu 🥺',
  'game me random mile the, par ab lagta hai aapke bina koi game accha hi nahi lagta 💫',
  'zyada innocent mat bano, mujhe pata hai aap kitna tease karti ho 🙈❤️'
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
    tape: '#ffd3e2',
    rot: -3,
    emoji: '👑',
    title: 'Chapter 23 Ki Shuruat',
    text: 'Naya saal, nayi yaadein aur wahi meri pyari si dora jiske nakhre roz uthane hain! 🎂✨',
    secretNote: 'Secret: Sneha, chahe jitne saal beet jayein, mere liye aap hamesha wahi meri cute si baccha rahogi ❤️',
    deco: 'star',
    customSticker: 'assets/kisses/milk_mocha_kiss_1.webm',
    pookieIdx: 1,
    tag: 'Chapter 23'
  },
  {
    tape: '#d9ecff',
    rot: 2.5,
    emoji: '🎮',
    title: 'Pehli Baar Game Me Milna',
    text: 'woh pehli baar jab hum game me mile the… kisko pata tha ek teammate meri life ka sabse favourite insaan ban jayega! 👾',
    secretNote: 'Secret: Us din ke baad se mera game khelne ka reason hi badal gaya tha. Bas aapke sath time spend karna accha lagta hai 🙈✨',
    deco: 'heart',
    pookieIdx: 21,
    tag: 'Player 1 & 2'
  },
  {
    tape: '#fff3c9',
    rot: -2,
    emoji: '💬',
    title: 'Raat Ki Pyaari Baatein',
    text: 'game khatam hone ke baad bhi ghanto tak ek dusre se baatein karte rehna aur hasna 📱✨',
    secretNote: 'Secret: Jab aap bolti ho "neend aa rahi hai" par fir bhi baat karti rehti ho, dil wahi pighal jaata hai 🥺💖',
    deco: 'flower',
    customSticker: 'assets/kisses/cuddle_3.gif',
    pookieIdx: 12,
    tag: 'Sweet Moments'
  },
  {
    tape: '#e2dcff',
    rot: 3,
    emoji: '🤤',
    title: 'Gaal Kheenchne Ka Plan',
    text: 'aapke soft gaal squish karne aur tight hug karne ka plan 🤤🙈',
    secretNote: 'Secret: Jab bhi milenge, pehle 10 minute non-stop hug aur gaal squish honge, no escape allowed 😤❤️',
    deco: 'bow',
    customSticker: 'assets/kisses/milk_mocha_kiss_3.gif',
    pookieIdx: 42,
    tag: 'Cheek Nibbles'
  },
  {
    tape: '#ffe0ef',
    rot: -2.5,
    emoji: '💬',
    title: 'Pyaare Screenshots',
    text: 'woh funny aur sweet chats jo mere dil me hamesha ke liye saved hain 📩',
    secretNote: 'Secret: Meri gallery me sabse zyada aapke chats ke screenshots hain, jab bhi udaas hota hoon wahi padhta hoon 📸✨',
    deco: 'sparkle',
    pookieIdx: 41,
    tag: 'Cute Chats'
  },
  {
    tape: '#d9f6e8',
    rot: 2,
    emoji: '💖',
    title: 'Hamesha Sath Rehna',
    text: 'distance se koi farak nahi padta, kyunki meri har subah aur har raat aapke message se shuru hoti hai 🫶',
    secretNote: 'Secret: Chahe jo bhi ho jaye, main hamesha aapke sath hoon. Hamesha meri player 2 rehna ❤️',
    deco: 'cloud',
    customSticker: 'assets/kisses/milk_mocha_kiss_13.gif',
    pookieIdx: 15,
    tag: 'Forever'
  }
]
// -------------------------------------------------------------------------
// 🎟️ [SECTION 7] SCENE 10: 3 LOVE COUPONS / SCRATCH PASSES
// Ye 3 secret scratch cards hain jinhe Sneha coin/finger se scratch karegi.
// -------------------------------------------------------------------------
export const LOVE_COUPONS = [
  {
    id: 1,
    icon: '🫦',
    title: 'Cheek Squish & Hug Pass', // Coupon 1 Title
    desc: 'Jab bhi milenge — unlimited gaal kheenchne aur tight cuddles ka legal haq!', // Coupon 1 Detail
    stamp: 'HAMESHA VALID',
    customSticker: 'assets/kisses/milk_mocha_kiss_3.gif',
    color: 'linear-gradient(135deg, #ffd9e8 0%, #ff85a8 100%)'
  },
  {
    id: 2,
    icon: '🍦',
    title: 'Late Night Treat Delivery', // Coupon 2 Title
    desc: 'Jab bhi ice cream, chocolate ya favourite khane ka man kare, turant order milega!', // Coupon 2 Detail
    stamp: 'ON-DEMAND',
    customSticker: 'assets/kisses/cuddle_5.gif',
    color: 'linear-gradient(135deg, #fff3c9 0%, #ffcb45 100%)'
  },
  {
    id: 3,
    icon: '👑',
    title: 'Mommy Is Always Right Ticket', // Coupon 3 Title
    desc: 'Mommy 100% sahi hain, chahe jo bhi baat ho. Koi arguments nahi 😜', // Coupon 3 Detail
    stamp: 'VIP QUEEN ONLY',
    customSticker: 'assets/kisses/bubu_kiss_5.gif',
    color: 'linear-gradient(135deg, #e6dbff 0%, #a855f7 100%)'
  }
]

// -------------------------------------------------------------------------
// 💌 [SECTION 8] SCENE 12: HANDWRITTEN TYPEWRITER LETTER (Dil Ki Chitthi)
// Ye dil ko chhu lene wali typewriter chitthi hai jo wax seal kholne par dikhti hai.
// -------------------------------------------------------------------------
export const LETTER_LINES = [
  'Dear Sneha (meri sabse pyari mommy, mera baccha),',
  '',
  'HAPPY BIRTHDAY!! 🎂✨',
  '',
  'Aaj ka din sach me mere liye bohot khaas hai. Pata hai, jab hum pehli baar game lobby me mile the, maine kabhi nahi socha tha ki ek random teammate aage chalke mere dil ka sabse sukoon bhara hissa ban jayegi.',
  '',
  'Aapka mujhe choti-choti baaton par daantna, mera phone charge na hone par gussa karna, raat ko ghanto tak akele me baatein karna, aur bina aapki aawaz sune bhi sirf aapke texts dekh kar dil ka khush ho jaana — yeh sab mere liye duniya ka sabse pyara ehsaas hai.',
  '',
  'Sach bataun toh, jab bhi mere aas-paas shor hota hai ya din thoda mushkil lagta hai, bas aapka ek pyaara sa message aate hi sab theek ho jaata hai. Aap meri life ka sabse peaceful aur safe corner ho.',
  '',
  'Aur haan, jab bhi hum pehli baar milenge na, main bina sharmaye pehle aapke dono gaal kheenchunga, aapko tight hug dunga aur itna tang karunga ki aap bas sharmaati reh jaogi 🙈💖',
  '',
  'Thank you hamesha mere saath rehne ke liye, meri baatein sunne ke liye aur mujhe itna special feel karwane ke liye. Hamesha aise hi muskuraate rehna.',
  '',
  '— sirf aapka apna, hamesha ke liye 🥺❤️',
  '',
  'ps: aaj bas khush raho, smile karte raho aur apna din enjoy karo! 💙'
]

// -------------------------------------------------------------------------
// 🐾 [SECTION 9] SCENE 6: CAT BREAK / PAW-SE MOMENT
// Chota sa cute pause jisme animated cat/pookie aakar dialogue bolta hai.
// -------------------------------------------------------------------------
export const CAT_BREAKS = [
  { cat: 'cute', caption: 'meow break! world ki sabse cute mommy ke liye chota sa pause 🐾💖' },
  { cat: 'smug', caption: 'pata hai, pata hai. aap world ki sabse cute ladki hain 🐱😏' },
  { cat: 'sleepy', caption: 'itni der raat tak chat karoge toh billi bhi so jayegi zzz~ 😴' },
  { cat: 'dramatic', caption: 'ab jo aage aane wala hai, ready ho mommy? 👀' }
]

// -------------------------------------------------------------------------
// 🏰 [SECTION 10] SCENE 7: EXPLORER WONDERLAND ROOM (8 Hidden Objects)
// Room ke andar 8 secret objects chhupe hain jinhe tap karke collect karna hota hai.
// -------------------------------------------------------------------------
export const EXPLORER_PROPS = [
  { id: 'star', emoji: '⭐', left: '10%', top: '14%', label: 'Glowing Star', blip: 520, line: 'Meri life ka sabse chamakta hua star 🌟' },
  { id: 'flower', emoji: '🌸', left: '48%', top: '8%', label: 'Cherry Blossom', blip: 580, line: 'Dora, aapke aane se chehre par smile aa jaati hai 🌷' },
  { id: 'cloud', emoji: '☁️', left: '80%', top: '16%', label: 'Fluffy Heart Cloud', blip: 640, line: 'Dil ko sukoon dene wala baadal ☁️💖' },
  { id: 'sparkle', emoji: '✨', left: '22%', top: '46%', label: 'Magic Wand Sparkle', blip: 700, line: 'Aapka pyaara sa charm aur smile ✨' },
  { id: 'balloon', emoji: '🎈', left: '76%', top: '48%', label: 'Birthday Balloon', blip: 760, line: 'Pop!! Gaal kheenchne ka token mila 🎈' },
  { id: 'note', emoji: '🎵', left: '12%', top: '72%', label: 'Melody Note', blip: 820, line: 'Aapka text notification = meri favourite ringtone 🎶' },
  { id: 'moon', emoji: '🌙', left: '50%', top: '74%', label: 'Midnight Moon', blip: 880, line: 'Raat ki shant baaton ka saathi 🌙' },
  { id: 'heart', emoji: '💖', left: '84%', top: '76%', label: 'Special Heart For You', blip: 940, line: 'Yeh poora dil sirf aapke liye hai 💝' }
]

export const FINALE_LETTERS = ['HAPPY', 'BIRTHDAY']

// -------------------------------------------------------------------------
// 💖 [SECTION 11] SCENE 15: FINAL MESSAGE (Grand Finale Ke Baad Ka Message)
// -------------------------------------------------------------------------
export const FINAL_MESSAGE = [
  'Toh… meri jaan. 💖',
  'Aap meri life ka sabse pyara aur sabse khoobsurat hissa ho.',
  'Game lobby se shuru hui humari baatein aaj mere dil ka sabse bada sukoon hain.',
  'Dher saare hugs, gaal squishes aur care hamesha sirf aapke liye reserved hai 🙈',
  'Happy Birthday, meri mommy, meri dora, mera baccha! ❤️🎂'
]

// -------------------------------------------------------------------------
// 🎁 [SECTION 12] SECRET EASTER EGG REWARD
// Jab Sneha 'Don't click' button ko 5 baar tap karegi tab ye secret reward khulega.
// -------------------------------------------------------------------------
export const SECRET_REWARD = {
  title: 'SECRET UNLOCKED 🔓',
  body: 'Aapne dhund hi liya! Obviously — meri baat thodi na sunti ho aap. Toh aapka gift: Unlimited cheek squishes, jab man kare tab late night baatein, aur dher saare sweet hugs jab hum milenge! 🍰🤗💙',
  teddy: 'love'
}

// =========================================================================
//  🌟 [SECTION 13] 100% CENTRALIZED UI TEXT FOR ALL PAGES (Headings & Buttons)
// =========================================================================

// --- 🚪 Page 2: Welcome Door Page ---
export const WELCOME_CONTENT = {
  crownBadge: '👑 SPECIAL SURPRISE FOR MY FAVOURITE HUMAN 👑',
  title: 'Hey Mommy, Aao Dekho! 👋💖',
  subtitle: 'Aapke birthday ke liye ek magical surprise gate wait kar raha hai…',
  doorClosed: 'Magic Door Kholo 🔑',
  doorClosedSub: 'Tap to unlock your surprise',
  doorOpen: 'Door Khul Raha Hai… 🌟',
  doorOpenSub: 'Wonderland me entry…',
  ctaBtn: '🚪 Magic Door Unlock Karein ✨'
}

// --- 🏃‍♀️ Page 3: Runaway Button Page ---
export const RUNAWAY_CONTENT = {
  heading: 'Pakad Ke Dikhao! 😜',
  subtitle: 'Aap itni asani se aage nahi ja sakti, pehle button pakdo 🏃‍♀️💨',
  caughtBtn: 'Aap Jeet Gayi! Ab Surprise Khulega 🎁✨'
}

// --- 📦 Page 4: Fake Gift / Parcel Delivery Page ---
export const FAKE_GIFT_CONTENT = {
  heading: 'Ek Special Parcel Aaya Hai! 📦',
  subtitle: 'Aapke liye courier deliver hua hai… tap karke unbox karein',
  boxClosed: 'Tap to Open Parcel 🎀',
  boxOpen: 'Unboxing Surprise… ✨',
  revealedTitle: 'Special Birthday Delivery!',
  revealedBody: 'Aapki favourite chocolate ganache cake & secret wishes! 💖',
  nextBtn: 'Surprise Shuru Karein →'
}

// --- 🏰 Page 7: Explorer Wonderland Room Page ---
export const EXPLORER_CONTENT = {
  heading: 'Enchanted Wonderland Room 🏰',
  subtitle: 'Room me 8 secret cheezein chupi hain… tap karke dhundiye!',
  progressLabel: 'Collectibles Found:',
  allFoundBanner: 'Sab Cheezein Mil Gayi! Ab Aage Chalein ✨',
  nextBtn: 'Compliments Khologe? 🃏✨'
}

// --- 🃏 Page 8: Compliments Cards Page ---
export const COMPLIMENTS_UI = {
  heading: 'Why You Are My World 👑',
  subtitle: 'Har card me aapke liye ek dil ki baat hai… flip karke dekhein 💖',
  counter: 'Card {current} of {total}',
  nextBtn: 'Next Card →',
  finishBtn: 'Ab Romantic Kisses & Soft Nibbles Lo 💋🐻✨'
}

// --- 💋 Page 9: The 4-Step Kiss & Soft Hug Ceremony ---
export const KISS_CEREMONY_CONTENT = {
  title: '💋 The 4-Step Kiss & Soft Hug Ritual',
  step1: {
    prompt: 'Mommy, pehle apna Left gaal aage kijiye na… 🥺',
    actionBtn: 'Left Gaal Aage Karo 👈🫦',
    reaction: 'Mmmm! Left gaal pe mera haq ho gaya 😋💖'
  },
  step2: {
    prompt: 'Ab Right gaal ki baari, dono taraf barabar pyaar hona chahiye 😌',
    actionBtn: 'Ab Right Gaal Do 👉🫦',
    reaction: 'Right gaal itna soft hai na, man karta hai bas kheenchta rahoon 🤤❤️'
  },
  step3: {
    prompt: 'Ab thodi der aankhein band kijiye… forehead kiss ke liye 🥺✨',
    actionBtn: 'Aankhein Band Karke Kiss Lo 🙈✨',
    reaction: 'Yeh kiss aapki hamesha izzat aur care karne ke liye hai 🫶💫'
  },
  step4: {
    prompt: 'Ab batayein… 4th kiss kahan chahiye aapko? 🤔',
    options: [
      'Neck pe soft cute kiss 🙈',
      'Lips pe sweet gentle kiss 💋',
      'Nose pe cute boop kiss 👃',
      'Ek tight endless warm hug 🤗'
    ],
    revealDialog: 'Ayy hayy! Sharma gayi na! Yeh 4th secret kiss… aaj raat ko akele me chats me aur jab milenge tab real me milegi! Exclusive rights locked 🤫😏❤️',
    finishBtn: 'Ayy Hayy Sharma Gayi! Ab Aage Chalein 🙈✨'
  }
}

// --- 🎟️ Page 10: Scratch Cards Page ---
export const SCRATCH_UI = {
  heading: 'Exclusive Birthday Passes 🎟️',
  subtitle: '3 Secret passes hain… scratch karke claim karein!',
  nextBtnUnlocked: 'Sab Passes Claim Ho Gaye! Ab Scrapbook Dekhein 📔✨',
  nextBtnLocked: 'Aage Chalein →'
}

// --- ⏳ Page 11: Scrapbook & Live Age Dashboard Page ---
export const SCRAPBOOK_UI = {
  heading: 'Live Moments & Cute Memories ⏳',
  subtitle: 'Meri sabse pyaari mommy ka pyara sa safar',
  flipHint: 'Tap polaroid to reveal secret handwritten back note 💌',
  nextBtn: 'Khaas Handwritten Letter Padhein 💌✨'
}

// --- 💌 Page 12: Handwritten Chitthi Page ---
export const LETTER_UI = {
  heading: 'Aapke Naam Ek Khaas Chitthi 💌',
  waxSealTip: 'WAX SEAL • TAP TO OPEN',
  finishBtn: 'Almost done… ab cake cutting time! 🎂✨'
}

// --- 🎂 Page 13: 3D Birthday Cake & Candle Blow Page ---
export const CAKE_UI = {
  badge: 'SPECIAL BIRTHDAY CAKE FOR MY QUEEN',
  plaque: '👑 QUEEN SNEHA • 23 👑',
  blowTapBtn: '💨 Tap To Blow Candle',
  blowMicBtn: 'Mic Se Phooko 🎤',
  cutBtn: '🔪 Golden Knife Se Cake Cut Karein ✨',
  slicedBite0: '🍰 Cake cut ho gaya! Pehla bite lo 🤤',
  slicedBite1: '🎉 Sneha ke chehre par sweet smile! Ek aur bite? 😋',
  slicedBite2: '✨ Perfect! Ab Finale Celebration ki baari 👑',
  nextBtn: 'Grand Finale Celebration Dekhein 🎆✨'
}

// --- 🎆 Page 14: Grand Finale Page ---
export const FINALE_UI = {
  heading: 'HAPPY BIRTHDAY QUEEN SNEHA! 👑🎉',
  subtitle: 'Level 23 Unlocked • Meri Zindagi Ka Sabse Pyaara Sukoon',
  replayBtn: 'Surprise Phir Se Dekhein ↺',
  finalLove: 'Forever & Always Your Player 2 ❤️'
}

// --- 🤫 Bottom Bar Controls ---
export const HUD_UI = {
  dontClick: '🤫 mujhe mat dabao'
}
