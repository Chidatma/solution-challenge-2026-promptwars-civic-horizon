
export type Language = 'en' | 'hi';

export const translations = {
  en: {
    nav: {
      timeline: 'TIMELINE',
      education: 'EDUCATION',
      simulator: 'SIMULATOR',
      about: 'ABOUT',
      login: 'LOGIN',
      logout: 'LOGOUT',
      profile: 'PROFILE',
      xp: 'Civic XP',
      startLearning: 'START LEARNING',
      progress: 'Progress',
      langLabel: 'LANGUAGE / भाषा'
    },
    search: {
      placeholder: 'Search for topics, events, or questions...',
      title: 'GLOBAL RESEARCH',
      noResults: 'No relevant tactical data found.',
      sections: {
        timeline: 'Timeline Events',
        education: 'Knowledge Hub',
        chat: 'Ask Electra'
      }
    },
    hero: {
      badge1: '18+ Eligible',
      badge2: 'Election Day',
      badge3: 'Your Voice',
      title: 'SHAPING THE FUTURE OF',
      democracy: 'DEMOCRACY',
      tagline: 'Your non-partisan guide to understanding, participating, and mastering the civic process in the digital age.',
      cta1: 'START YOUR JOURNEY',
      cta2: 'LEARN MORE'
    },
    timeline: {
      title: 'ELECTION TIMELINE',
      subtitle: 'The journey of a vote, from registration to verification.',
      close: 'CLOSE DETAILS',
      share: 'Share Milestone',
      details: 'Details',
      understood: 'Understood',
      journey: 'The Journey',
      steps: {
        'candidate-filing': { title: 'Candidate Filing', desc: 'Individuals officially declare their intention to run for office and file necessary paperwork.', date: 'Jan - Mar' },
        'primaries': { title: 'Primaries & Caucuses', desc: 'Political parties choose their nominees for the general election through state-level voting.', date: 'Feb - June' },
        'conventions': { title: 'National Conventions', desc: 'Parties officially nominate their candidates and unify behind a platform.', date: 'July - Aug' },
        'general-campaign': { title: 'General Campaign', desc: 'Nominees travel the country, debate, and present their vision to the entire electorate.', date: 'Sept - Oct' },
        'election-day': { title: 'Election Day', desc: 'Millions of citizens cast their ballots at polling stations or via mail.', date: 'Nov (First Tues)' },
        'electoral-college': { title: 'Electoral College', desc: 'Electors meet in their respective states to cast their votes for President and VP.', date: 'December' },
        'inauguration': { title: 'Inauguration', desc: 'The newly elected President and Vice President are sworn into office.', date: 'January 20' },
        'voter-list-in': { title: 'Voter List Revision', desc: 'The ECI updates the electoral rolls to include new voters and remove deceased or relocated ones.', date: 'Continuous' },
        'nomination-in': { title: 'Filing of Nominations', desc: 'Candidates file their papers and pay security deposits to the Returning Officer.', date: 'Week 1' },
        'scrutiny-in': { title: 'Scrutiny of Papers', desc: 'Election officials verify the validity of nomination papers filed by candidates.', date: 'Week 2' },
        'withdrawal-in': { title: 'Withdrawal of Candidacy', desc: 'Candidates have a final window to withdraw their names from the contest.', date: 'Week 2' },
        'polling-in': { title: 'Polling Day', desc: 'Voters cast their ballots using EVMs at assigned polling stations.', date: 'Multi-Phase' },
        'counting-in': { title: 'Counting & Results', desc: 'Votes are counted from EVMs and results are declared officially.', date: 'Post-Polling' }
      }
    },
    voting: {
      title: 'VOTING SIMULATOR',
      experience: 'Interactive Experience',
      step1: 'Register',
      step2: 'Locate',
      step3: 'Vote',
      step4: 'Tally',
      castButton: 'Cast Ballot',
      submitting: 'Verifying Security...',
      voterVerified: 'Voter Verified',
      encrypting: 'Encrypting & Transmitting...',
      voteRecorded: 'VOTE RECORDED',
      back: 'Back',
      continue: 'Continue',
      reset: 'Reset Simulation',
      labels: {
        name: 'Legal Full Name',
        age: 'Current Age',
        zip: 'Zip Code',
        registrationVaries: 'Registration varies by state. Some allow same-day registration, others require it weeks in advance.',
        eligibleVoters: 'Eligible voters must be:',
        citizen: 'A U.S. citizen',
        ageReq: 'At least 18 years old',
        residency: 'Meet residency requirements'
      }
    },
    profile: {
      title: 'CIVIC PROGRESS',
      xp: 'Civic XP',
      badges: 'Badges',
      rank: 'Rank',
      level: 'Level',
      mastery: 'Module Mastery',
      share: 'Share Progress',
      noBadges: 'No badges earned yet',
      startLearning: 'Start learning to track progress',
      xpRequired: 'XP required for',
      levelAbbr: 'Lvl'
    },
    education: {
      title: 'DEEP DIVE TOPICS',
      subtitle: 'Knowledge Command Center',
      status: 'Status',
      read: 'READ',
      explore: 'Explore',
      quizMe: 'QUIZ ME ON THIS',
      verified: 'Verified Information',
      takeaway: 'Key Takeaway',
      foundational: 'Foundational knowledge for the citizen explorer.',
      federalGuide: 'Parties of Federal Guide',
      topics: {
        'electoral-college': { title: 'Electoral College', content: 'The Electoral College is a process, not a place. The founding fathers established it in the Constitution as a compromise between election of the President by a vote in Congress and election of the President by a popular vote of qualified citizens. The process consists of the selection of the electors, the meeting of the electors where they vote for President and Vice President, and the counting of the electoral votes by Congress.' },
        'gerrymandering': { title: 'Gerrymandering', content: 'Gerrymandering is a practice intended to establish a political advantage for a particular party or group by manipulating district boundaries. The primary goals are to maximize the effect of supporters\' votes and to minimize the effect of opponents\' votes. It can be used to protect incumbents, dilute the voting power of minority groups, or ensure a party keeps a majority in a legislature even with fewer total votes.' },
        'voter-id': { title: 'Voter ID Laws', content: 'Voter ID laws are laws that require a person to provide some form of identification (usually a photo ID) in order to register to vote, receive a ballot for an election, or to actually vote. Proponents argue they prevent in-person impersonation and increase public confidence, while opponents argue they can place an unfair burden on low-income, racial minority, and elderly voters who may lack such documentation.' },
        'finance': { title: 'Campaign Finance', content: 'Campaign finance refers to the funds raised to promote candidates, political parties, or policy initiatives. In the U.S., this is regulated by the Federal Election Commission (FEC). Key concepts include PACs (Political Action Committees), Super PACs which can raise unlimited amounts from corporations and unions, and the \'Citizens United\' Supreme Court ruling which drastically changed how political spending is categorized relative to free speech.' },
        'eci-in': { title: 'Election Commission', content: 'The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India.' },
        'evm-vvpat': { title: 'EVM & VVPAT', content: 'Electronic Voting Machines (EVM) are used to cast votes in India. Voter Verifiable Paper Audit Trail (VVPAT) is an independent system attached to EVMs that allows voters to verify that their votes are cast as intended.' },
        'mcc-in': { title: 'Model Code of Conduct', content: 'The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for conduct of political parties and candidates during elections.' },
        'fp-in': { title: 'First-Past-The-Post', content: 'India follows the \'First-Past-The-Post\' system for its general elections to the Lok Sabha.' }
      }
    },
    quiz: {
      title: 'DEMOCRACY IQ TEST',
      questionOf: 'Question',
      explanation: 'EXPLANATION',
      evaluated: 'IQ EVALUATED',
      champion: 'Democracy Champion Level Attained',
      accuracy: 'Accuracy',
      xpEarned: 'XP Earned',
      tryAgain: 'Try Again',
      shareResults: 'Share Results',
      questions: [
        {
          text: "How many total electoral votes are there in the U.S. presidential election?",
          options: ["435", "100", "538", "270"],
          explanation: "There are 538 total electors: 435 Representatives, 100 Senators, and 3 electors for the District of Columbia."
        },
        {
          text: "Which amendment lowered the voting age to 18?",
          options: ["19th Amendment", "15th Amendment", "26th Amendment", "13th Amendment"],
          explanation: "The 26th Amendment, ratified in 1971, lowered the voting age from 21 to 18 in response to the Vietnam War."
        },
        {
          text: "What is the minimum number of electoral votes needed to win the Presidency?",
          options: ["218", "270", "300", "538"],
          explanation: "A candidate must win a simple majority of electors, which is 270 out of 538."
        },
        {
          text: "Which state does NOT use a 'winner-take-all' system for awarding electoral votes?",
          options: ["Florida", "California", "Maine", "Texas"],
          explanation: "Maine and Nebraska are the only two states that allocate their electoral votes proportionally."
        },
        {
          text: "What is the primary role of the U.S. Census in the election process?",
          options: ["Determining tax rates", "Determining House representation", "Deciding election dates", "Selecting the President"],
          explanation: "The census determines how many seats each state gets in the House of Representatives, which affects their electoral votes."
        },
        {
          text: "How often are elections for the U.S. House of Representatives held?",
          options: ["Every 2 years", "Every 4 years", "Every 6 years", "Every year"],
          explanation: "Members of the House of Representatives serve two-year terms and are up for re-election every even-numbered year."
        },
        {
          text: "What is 'Early Voting'?",
          options: ["Voting before age 18", "Voting before Election Day", "Voting in the morning", "Voting for unannounced candidates"],
          explanation: "Early voting allows citizens to cast ballots before official Election Day, providing flexibility and reducing queues."
        },
        {
          text: "Which body is responsible for certifying Presidential election results?",
          options: ["The Supreme Court", "The Department of Justice", "The U.S. Congress", "The FBI"],
          explanation: "Congress meets in a joint session to count electoral votes and officially certify the winner of the presidential election."
        },
        {
          text: "What is a 'Primary Election'?",
          options: ["The final election", "Selecting a party's candidate", "Local-only election", "Monthly election"],
          explanation: "Primaries are held by political parties to select the candidates who will represent them in the general election."
        }
      ]
    },
    chatGuide: {
      title: 'ASK ELECTRA AI',
      subtitle: 'REAL-TIME CIVIC INTELLIGENCE',
      placeholder: 'Ask anything about the election process...',
      greeting: 'Greeting, citizen. I am **Electra**, your guide to the machinery of democracy. How can I illuminate the election process for you today?',
      error: 'Electra is having trouble responding right now. Please try again in a moment.',
      suggestions: [
        "How do primaries work?",
        "What is the Electoral College?",
        "How is voter fraud prevented?",
        "What is gerrymandering?"
      ]
    },
    dashboard: {
      title: 'LIVE ELECTION DATA',
      subtitle: 'Command Center Alpha',
      liveFeeds: 'Live Feeds Active',
      participation: 'VOTER PARTICIPATION BY REGION',
      projectedTurnout: 'Projected Turnout',
      precinctsReady: 'Precincts Ready',
      newsHeader: 'ELECTION NEWSWIRE',
      fullArchive: 'View Full Archive',
      news: [
        'Polls open across Eastern Standard Time districts',
        'High voter turnout reported in Battleground County',
        'Electoral Commission confirms cybersecurity systems stable',
        'Early voting figures surpass 2022 records'
      ]
    },
    resources: {
      title: 'RESOURCES & CIVIC HUB',
      subtitle: 'Take Action',
      official: 'Official Source',
      stayUpdated: 'STAY UPDATED',
      newsletter: 'Join our monthly newsletter for election reminders, civic tips, and the latest on democratic institutions.',
      subscribe: 'SUBSCRIBE',
      items: [
        { title: 'Voter Registration', desc: 'Secure links to your state authority.' },
        { title: 'Polling Place Locator', desc: 'Find where to cast your ballot.' },
        { title: 'Sample Ballots', desc: 'Preview what you will see on Election Day.' },
        { title: 'Election Results', desc: 'Historical data and trends.' }
      ]
    },
    footer: {
      tagline: 'Revolutionizing civic education through cinematic interactivity. An non-partisan platform dedicated to empowering every citizen.',
      platform: 'Platform',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      disclaimer: 'Disclaimer',
      rights: '© 2026 Civic Horizon Platform. All rights reserved.',
      builtFor: 'Built for a more perfect union.'
    },
    chatbot: {
      title: 'ELECTRA GUIDE',
      subtitle: 'Always ready to assist',
      welcome: 'Ready to explore the nuances of democracy? I can help you with anything from registration to the nuances of the Electoral College.',
      launch: 'LAUNCH FULL TERMINAL'
    }
  },
  hi: {
    nav: {
      timeline: 'समयरेखा',
      education: 'शिक्षा',
      simulator: 'सिमुलेटर',
      about: 'हमारे बारे में',
      login: 'लॉगइन',
      logout: 'लॉगआउट',
      profile: 'प्रोफ़ाइल',
      xp: 'नागरिक एक्सपी',
      startLearning: 'सीखा शुरू करें',
      progress: 'प्रगति',
      langLabel: 'भाषा / LANGUAGE'
    },
    search: {
      placeholder: 'विषयों, घटनाओं या प्रश्नों की खोज करें...',
      title: 'ग्लोबल रिसर्च',
      noResults: 'कोई प्रासंगिक डेटा नहीं मिला।',
      sections: {
        timeline: 'समयरेखा घटनाएँ',
        education: 'ज्ञान केंद्र',
        chat: 'इलेक्ट्रा से पूछें'
      }
    },
    hero: {
      badge1: '18+ पात्र',
      badge2: 'चुनाव का दिन',
      badge3: 'आपकी आवाज़',
      title: 'भविष्य को आकार देना',
      democracy: 'लोकतंत्र',
      tagline: 'डिजिटल युग में चुनावी प्रक्रिया को समझने, भाग लेने और महारत हासिल करने के लिए आपका निष्पक्ष मार्गदर्शक।',
      cta1: 'अपनी यात्रा शुरू करें',
      cta2: 'अधिक जानें'
    },
    timeline: {
      title: 'चुनाव समयरेखा',
      subtitle: 'पंजीकरण से सत्यापन तक, एक वोट की यात्रा।',
      close: 'विवरण बंद करें',
      share: 'साझा करें',
      details: 'विवरण',
      understood: 'समझ गया',
      journey: 'यात्रा',
      steps: {
        'candidate-filing': { title: 'उम्मीदवार का नामांकन', desc: 'व्यक्ति आधिकारिक रूप से चुनाव लड़ने की अपनी इच्छा घोषित करते हैं और आवश्यक कागजी कार्रवाई दाखिल करते हैं।', date: 'जनवरी - मार्च' },
        'primaries': { title: 'प्राइमरी और कॉकस', desc: 'राजनीतिक दल राज्य स्तर के मतदान के माध्यम से आम चुनाव के लिए अपने उम्मीदवारों का चयन करते हैं।', date: 'फरवरी - जून' },
        'conventions': { title: 'राष्ट्रीय सम्मेलन', desc: 'दल आधिकारिक रूप से अपने उम्मीदवारों को नामित करते हैं और एक मंच के पीछे एकजुट होते हैं।', date: 'जुलाई - अगस्त' },
        'general-campaign': { title: 'आम अभियान', desc: 'नामांकित व्यक्ति देश भर में यात्रा करते हैं, बहस करते हैं और अपना दृष्टिकोण मतदाताओं के सामने रखते हैं।', date: 'सितंबर - अक्टूबर' },
        'election-day': { title: 'चुनाव का दिन', desc: 'लाखों नागरिक मतदान केंद्रों पर या मेल के माध्यम से अपना वोट डालते हैं।', date: 'नवंबर (पहला मंगलवार)' },
        'electoral-college': { title: 'इलेक्टोरल कॉलेज', desc: 'निर्वाचक अपने राज्यों में राष्ट्रपति और उपराष्ट्रपति के लिए अपना वोट डालने के लिए मिलते हैं।', date: 'दिसंबर' },
        'inauguration': { title: 'शपथ ग्रहण', desc: 'नवनिर्वाचित राष्ट्रपति और उपराष्ट्रपति अपने पद की शपथ लेते हैं।', date: '20 जनवरी' },
        'voter-list-in': { title: 'मतदाता सूची पुनरीक्षण', desc: 'ईसीआई नए मतदाताओं को शामिल करने और मृत या स्थानांतरित लोगों को हटाने के लिए चुनावी रोल अपडेट करता है।', date: 'सतत' },
        'nomination-in': { title: 'नामांकन दाखिल करना', desc: 'उम्मीदवार अपने पत्र दाखिल करते हैं और रिटर्निंग अधिकारी के पास सुरक्षा जमा जमा करते हैं।', date: 'सप्ताह 1' },
        'scrutiny-in': { title: 'कागजात की जांच', desc: 'चुनाव अधिकारी उम्मीदवारों द्वारा दायर नामांकन पत्रों की वैधता की पुष्टि करते हैं।', date: 'सप्ताह 2' },
        'withdrawal-in': { title: 'उम्मीदवारी वापस लेना', desc: 'उम्मीदवारों के पास प्रतियोगिता से अपना नाम वापस लेने का अंतिम अवसर होता है।', date: 'सप्ताह 2' },
        'polling-in': { title: 'मतदान का दिन', desc: 'मतदाता नियत मतदान केंद्रों पर ईवीएम का उपयोग करके अपना वोट डालते हैं।', date: 'बहु-चरण' },
        'counting-in': { title: 'गिनती और परिणाम', desc: 'ईवीएम से वोटों की गिनती की जाती है और परिणाम आधिकारिक रूप से घोषित किए जाते हैं।', date: 'मतदान के बाद' }
      }
    },
    voting: {
      title: 'मतदान सिमुलेटर',
      experience: 'इंटरैक्टिव अनुभव',
      step1: 'पंजीकरण',
      step2: 'ढूंढें',
      step3: 'वोट दें',
      step4: 'गणना',
      castButton: 'वोट डालें',
      submitting: 'सुरक्षा की पुष्टि हो रही है...',
      voterVerified: 'मतदाता सत्यापित',
      encrypting: 'एन्क्रिप्ट और ट्रांसमिट हो रहा है...',
      voteRecorded: 'वोट रिकॉर्ड हो गया',
      back: 'पीछे',
      continue: 'जारी रखें',
      reset: 'सिमुलेशन रीसेट करें',
      labels: {
        name: 'विधिक पूरा नाम',
        age: 'वर्तमान आयु',
        zip: 'पिन कोड',
        registrationVaries: 'पंजीकरण नियमों में राज्य के अनुसार बदलाव होते हैं। कुछ राज्य उसी दिन पंजीकरण की अनुमति देते हैं, अन्य को हफ्तों पहले इसकी आवश्यकता होती है।',
        eligibleVoters: 'पात्र मतदाताओं के लिए आवश्यक है:',
        citizen: 'एक अमेरिकी नागरिक होना',
        ageReq: 'कम से कम 18 वर्ष की आयु',
        residency: 'निवास संबंधी आवश्यकताओं को पूरा करना'
      }
    },
    profile: {
      title: 'नागरिक प्रगति',
      xp: 'नागरिक XP',
      badges: 'बैज',
      rank: 'रैंक',
      level: 'स्तर',
      mastery: 'मॉड्यूल में महारत',
      share: 'प्रगति साझा करें',
      noBadges: 'अभी तक कोई बैज नहीं मिला',
      startLearning: 'प्रगति देखने के लिए सीखना शुरू करें',
      xpRequired: 'एक्सपी की आवश्यकता है',
      levelAbbr: 'स्तर'
    },
    education: {
      title: 'गहन अध्ययन के विषय',
      subtitle: 'ज्ञान कमांड सेंटर',
      status: 'स्थिति',
      read: 'पढ़ा हुआ',
      explore: 'अन्वेषण करें',
      quizMe: 'इस पर क्विज़ लें',
      verified: 'सत्यापित जानकारी',
      takeaway: 'मुख्य निष्कर्ष',
      foundational: 'नागरिक अन्वेषक के लिए मौलिक ज्ञान।',
      federalGuide: 'संघीय गाइड का हिस्सा',
      topics: {
        'electoral-college': { title: 'इलेक्टोरल कॉलेज', content: 'इलेक्टोरल कॉलेज एक प्रक्रिया है, कोई स्थान नहीं। संस्थापक संस्थापकों ने इसे कांग्रेस द्वारा राष्ट्रपति के चुनाव और योग्य नागरिकों द्वारा लोकप्रिय वोट के माध्यम से राष्ट्रपति के चुनाव के बीच एक समझौते के रूप में संविधान में स्थापित किया था। प्रक्रिया में निर्वाचकों का चयन, निर्वाचकों की बैठक जहाँ वे राष्ट्रपति और उपराष्ट्रपति के लिए वोट करते हैं, और कांग्रेस द्वारा चुनावी वोटों की गिनती शामिल है।' },
        'gerrymandering': { title: 'गेरीमेंडरिंग', content: 'गेरीमेंडरिंग एक ऐसी प्रथा है जिसका उद्देश्य जिला सीमाओं में हेरफेर करके किसी विशेष पार्टी या समूह के लिए राजनीतिक लाभ स्थापित करना है। प्राथमिक लक्ष्य समर्थकों के वोटों के प्रभाव को अधिकतम करना और विरोधियों के वोटों के प्रभाव को कम करना है। इसका उपयोग पदधारियों की रक्षा करने, अल्पसंख्यक समूहों की मतदान शक्ति को कम करने, या यह सुनिश्चित करने के लिए किया जा सकता है कि कोई पार्टी कम कुल वोटों के साथ भी विधायिका में बहुमत बनाए रखे।' },
        'voter-id': { title: 'मतदाता पहचान कानून', content: 'मतदाता पहचान कानून वे कानून हैं जिनके लिए किसी व्यक्ति को मतदान करने के लिए पंजीकरण करने, चुनाव के लिए मतपत्र प्राप्त करने, या वास्तव में वोट देने के लिए किसी प्रकार की पहचान (आमतौर पर फोटो आईडी) प्रदान करने की आवश्यकता होती है। समर्थकों का तर्क है कि वे व्यक्तिगत प्रतिरूपण को रोकते हैं और जनता के विश्वास को बढ़ाते हैं, जबकि विरोधियों का तर्क है कि वे कम आय वाले, नस्लीय अल्पसंख्यक और बुजुर्ग मतदाताओं पर अनुचित बोझ डाल सकते हैं जिनके पास ऐसे दस्तावेज नहीं हो सकते हैं।' },
        'finance': { title: 'अभियान वित्त', content: 'अभियान वित्त उन निधियों को संदर्भित करता है जो उम्मीदवारों, राजनीतिक दलों या नीति पहलों को बढ़ावा देने के लिए जुटाई जाती हैं। अमेरिका में, यह संघीय चुनाव आयोग (FEC) द्वारा विनियमित होता है। प्रमुख अवधारणाओं में PAC (राजनीतिक कार्रवाई समितियां), सुपर PAC शामिल हैं जो निगमों और यूनियनों से असीमित राशि जुटा सकते हैं, और उच्चतम न्यायालय का \'सिटिज़न्स यूनाइटेड\' फैसला जिसने राजनीतिक खर्च को स्वतंत्र भाषण के सापेक्ष श्रेणीबद्ध करने के तरीके को काफी बदल दिया।' },
        'eci-in': { title: 'चुनाव आयोग', content: 'भारत का चुनाव आयोग (ECI) भारत में चुनाव प्रक्रियाओं के संचालन के लिए जिम्मेदार एक स्वायत्त संवैधानिक प्राधिकरण है।' },
        'evm-vvpat': { title: 'ईवीएम और वीवीपैट', content: 'भारत में वोट डालने के लिए इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) का उपयोग किया जाता है। वोटर वेरिफ़िएबल पेपर ऑडिट ट्रेल (वीवीपैट) ईवीएम से जुड़ा एक स्वतंत्र सिस्टम है जो मतदाताओं को यह सत्यापित करने की अनुमति देता है कि उनके वोट इच्छानुसार डाले गए हैं।' },
        'mcc-in': { title: 'आदर्श आचार संहिता', content: 'आदर्श आचार संहिता (एमसीसी) चुनाव के दौरान राजनीतिक दलों और उम्मीदवारों के आचरण के लिए ईसीआई द्वारा जारी दिशा-निर्देशों का एक समूह है।' },
        'fp-in': { title: 'पहले-आने-वाला-जीते', content: 'लोकसभा के आम चुनावों के लिए भारत \'फर्स्ट-पास्ट-द-पोस्ट\' प्रणाली का पालन करता है।' }
      }
    },
    quiz: {
      title: 'लोकतंत्र आईक्यू टेस्ट',
      questionOf: 'प्रश्न',
      explanation: 'विवरण',
      evaluated: 'आईक्यू मूल्यांकित',
      champion: 'लोकतंत्र चैंपियन स्तर प्राप्त किया',
      accuracy: 'सटीकता',
      xpEarned: 'अर्जित एक्सपी',
      tryAgain: 'फिर से कोशिश करें',
      shareResults: 'परिणाम साझा करें',
      questions: [
        {
          text: "अमेरिकी राष्ट्रपति चुनाव में कुल कितने इलेक्टोरल वोट होते हैं?",
          options: ["435", "100", "538", "270"],
          explanation: "कुल 538 निर्वाचक होते हैं: 435 प्रतिनिधि, 100 सीनेटर, और डिस्ट्रिक्ट ऑफ कोलंबिया के लिए 3 निर्वाचक।"
        },
        {
          text: "किस संशोधन ने मतदान की आयु घटाकर 18 वर्ष कर दी थी?",
          options: ["19वां संशोधन", "15वां संशोधन", "26वां संशोधन", "13वां संशोधन"],
          explanation: "1971 में अनुमोदित 26वें संशोधन ने वियतनाम युद्ध के जवाब में मतदान की आयु 21 से घटाकर 18 कर दी थी।"
        },
        {
          text: "राष्ट्रपति पद जीतने के लिए आवश्यक इलेक्टोरल वोटों की न्यूनतम संख्या क्या है?",
          options: ["218", "270", "300", "538"],
          explanation: "एक उम्मीदवार को निर्वाचकों का साधारण बहुमत जीतना चाहिए, जो 538 में से 270 है।"
        },
        {
          text: "कौन सा राज्य इलेक्टोरल वोट देने के लिए 'विजेता-सब-ले-जाता है' प्रणाली का उपयोग नहीं करता है?",
          options: ["फ्लोरिडा", "कैलिफोर्निया", "मेन", "टेक्सास"],
          explanation: "मेन और नेब्रास्का ही केवल दो ऐसे राज्य हैं जो अपने इलेक्टोरल वोटों को आनुपातिक रूप से आवंटित करते हैं।"
        },
        {
          text: "चुनाव प्रक्रिया में अमेरिकी जनगणना की प्राथमिक भूमिका क्या है?",
          options: ["कर दरों का निर्धारण", "प्रतिनिधि सभा में प्रतिनिधित्व का निर्धारण", "चुनाव की तारीखें तय करना", "राष्ट्रपति का चयन"],
          explanation: "जनगणना यह निर्धारित करती है कि प्रत्येक राज्य को प्रतिनिधि सभा में कितनी सीटें मिलेंगी, जो उनके चुनावी वोटों को प्रभावित करती है।"
        },
        {
          text: "अमेरिकी प्रतिनिधि सभा के लिए चुनाव कितनी बार आयोजित किए जाते हैं?",
          options: ["हर 2 साल में", "हर 4 साल में", "हर 6 साल में", "हर साल"],
          explanation: "प्रतिनिधि सभा के सदस्य दो साल के कार्यकाल के लिए सेवा करते हैं और हर सम-संख्या वाले वर्ष में फिर से चुनाव के लिए खड़े होते हैं।"
        },
        {
          text: "'शुरुआती मतदान' (Early Voting) क्या है?",
          options: ["18 वर्ष की आयु से पहले मतदान", "चुनाव के दिन से पहले मतदान", "सुबह में मतदान", "अघोषित उम्मीदवारों के लिए मतदान"],
          explanation: "शुरुआती मतदान नागरिकों को आधिकारिक चुनाव के दिन से पहले अपना वोट डालने की अनुमति देता है, जिससे लचीलापन मिलता है और कतारें कम होती हैं।"
        },
        {
          text: "राष्ट्रपति चुनाव के परिणामों को प्रमाणित करने के लिए कौन सा निकाय जिम्मेदार है?",
          options: ["उच्चतम न्यायालय", "न्याय विभाग", "अमेरिकी कांग्रेस", "एफबीआई"],
          explanation: "कांग्रेस चुनावी वोटों की गिनती करने और आधिकारिक तौर पर राष्ट्रपति चुनाव के विजेता को प्रमाणित करने के लिए एक संयुक्त सत्र में मिलती है।"
        },
        {
          text: "'प्राइमरी चुनाव' क्या है?",
          options: ["अंतिम चुनाव", "किसी पार्टी के उम्मीदवार का चयन करना", "केवल स्थानीय चुनाव", "मासिक चुनाव"],
          explanation: "राजनीतिक दलों द्वारा उन उम्मीदवारों का चयन करने के लिए प्राइमरी आयोजित की जाती है जो आम चुनाव में उनका प्रतिनिधित्व करेंगे।"
        }
      ]
    },
    chatGuide: {
      title: 'इलेक्ट्रा एआई से पूछें',
      subtitle: 'वास्तविक समय नागरिक बुद्धिमत्ता',
      placeholder: 'चुनाव प्रक्रिया के बारे में कुछ भी पूछें...',
      greeting: 'नमस्कार, नागरिक। मैं **इलेक्ट्रा** हूँ, लोकतंत्र की मशीनरी के लिए आपकी मार्गदर्शक। आज मैं आपके लिए चुनाव प्रक्रिया को कैसे स्पष्ट कर सकती हूँ?',
      error: 'इलेक्ट्रा अभी उत्तर देने में असमर्थ है। कृपया कुछ देर बाद पुनः प्रयास करें।',
      suggestions: [
        "प्राइमरी कैसे काम करते हैं?",
        "इलेक्टोरल कॉलेज क्या है?",
        "वोटर फ्रॉड को कैसे रोका जाता है?",
        "गेरीमेंडरिंग क्या है?"
      ]
    },
    dashboard: {
      title: 'लाइव चुनाव डेटा',
      subtitle: 'कमांड सेंटर अल्फा',
      liveFeeds: 'लाइव फ़ीड सक्रिय',
      participation: 'क्षेत्रानुसार मतदाता भागीदारी',
      projectedTurnout: 'अनुमानित मतदान',
      precinctsReady: 'तैयार निर्वाचन क्षेत्र',
      newsHeader: 'चुनाव समाचार वायर',
      fullArchive: 'पूर्ण संग्रह देखें',
      news: [
        'ईस्टर्न स्टैंडर्ड टाइम जिलों में मतदान केंद्र खुले',
        'बैटलग्राउंड काउंटी में उच्च मतदान दर्ज किया गया',
        'चुनाव आयोग ने साइबर सुरक्षा प्रणालियों के स्थिर होने की पुष्टि की',
        'शुरुआती मतदान के आंकड़े 2022 के रिकॉर्ड से आगे निकले'
      ]
    },
    resources: {
      title: 'संसाधन और नागरिक हब',
      subtitle: 'कार्रवाई करें',
      official: 'आधिकारिक स्रोत',
      stayUpdated: 'अपडेट रहें',
      newsletter: 'चुनाव अनुस्मारक, नागरिक सुझाव और लोकतांत्रिक संस्थानों पर नवीनतम जानकारी के लिए हमारे मासिक न्यूज़लेटर में शामिल हों।',
      subscribe: 'सब्सक्राइब करें',
      items: [
        { title: 'मतदाता पंजीकरण', desc: 'आपके राज्य प्राधिकरण के सुरक्षित लिंक।' },
        { title: 'मतदान केंद्र खोजक', desc: 'पता लगाएं कि अपना वोट कहाँ डालना है।' },
        { title: 'नमूना मतपत्र', desc: 'देखें कि आप चुनाव के दिन क्या देखेंगे।' },
        { title: 'चुनाव परिणाम', desc: 'ऐतिहासिक डेटा और रुझान।' }
      ]
    },
    footer: {
      tagline: 'सिनेमैटिक इंटरएक्टिविटी के माध्यम से नागरिक शिक्षा में क्रांति लाना। प्रत्येक नागरिक को सशक्त बनाने के लिए समर्पित एक निष्पक्ष मंच।',
      platform: 'मंच',
      legal: 'कानूनी',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      cookies: 'कुकी नीति',
      disclaimer: 'अस्वीकरण',
      rights: '© 2026 सिविक होराइजन प्लेटफॉर्म। सर्वाधिकार सुरक्षित।',
      builtFor: 'एक और अधिक पूर्ण संघ के लिए निर्मित।'
    },
    chatbot: {
      title: 'इलेक्ट्रा गाइड',
      subtitle: 'हमेशा सहायता के लिए तैयार',
      welcome: 'लोकतंत्र की बारीकियों का पता लगाने के लिए तैयार हैं? मैं पंजीकरण से लेकर इलेक्टोरल कॉलेज की बारीकियों तक किसी भी चीज़ में आपकी मदद कर सकता हूँ।',
      launch: 'फुल टर्मिनल लॉन्च करें'
    }
  }
};
