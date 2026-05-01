export interface Topic {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  icon: string;
  content: string;
}

export const topicsData: Record<string, Topic[]> = {
  US: [
    {
      id: 'electoral-college',
      title: 'Electoral College',
      level: 'Intermediate',
      time: '5 min',
      icon: 'Landmark',
      content: "The Electoral College is a process, not a place. The founding fathers established it in the Constitution as a compromise between election of the President by a vote in Congress and election of the President by a popular vote of qualified citizens. The process consists of the selection of the electors, the meeting of the electors where they vote for President and Vice President, and the counting of the electoral votes by Congress."
    },
    {
      id: 'gerrymandering',
      title: 'Gerrymandering',
      level: 'Advanced',
      time: '8 min',
      icon: 'Map',
      content: "Gerrymandering is a practice intended to establish a political advantage for a particular party or group by manipulating district boundaries. The primary goals are to maximize the effect of supporters' votes and to minimize the effect of opponents' votes. It can be used to protect incumbents, dilute the voting power of minority groups, or ensure a party keeps a majority in a legislature even with fewer total votes."
    },
    {
      id: 'voter-id',
      title: 'Voter ID Laws',
      level: 'Beginner',
      time: '4 min',
      icon: 'IdCard',
      content: "Voter ID laws are laws that require a person to provide some form of identification (usually a photo ID) in order to register to vote, receive a ballot for an election, or to actually vote. Proponents argue they prevent in-person impersonation and increase public confidence, while opponents argue they can place an unfair burden on low-income, racial minority, and elderly voters who may lack such documentation."
    },
    {
      id: 'finance',
      title: 'Campaign Finance',
      level: 'Advanced',
      time: '10 min',
      icon: 'DollarSign',
      content: "Campaign finance refers to the funds raised to promote candidates, political parties, or policy initiatives. In the U.S., this is regulated by the Federal Election Commission (FEC). Key concepts include PACs (Political Action Committees), Super PACs which can raise unlimited amounts from corporations and unions, and the 'Citizens United' Supreme Court ruling which drastically changed how political spending is categorized relative to free speech."
    }
  ],
  IN: [
    {
      id: 'eci-in',
      title: 'Election Commission',
      level: 'Beginner',
      time: '5 min',
      icon: 'ShieldCheck',
      content: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India. The body administers elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies in India, and the offices of the President and Vice President in the country."
    },
    {
      id: 'evm-vvpat',
      title: 'EVM & VVPAT',
      level: 'Intermediate',
      time: '6 min',
      icon: 'Monitor',
      content: "Electronic Voting Machines (EVM) are used to cast votes in India. Voter Verifiable Paper Audit Trail (VVPAT) is an independent system attached to EVMs that allows voters to verify that their votes are cast as intended. When a vote is cast, a slip of paper is printed and visible for seven seconds before falling into a sealed box."
    },
    {
      id: 'mcc-in',
      title: 'Model Code of Conduct',
      level: 'Beginner',
      time: '4 min',
      icon: 'Scale',
      content: "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for conduct of political parties and candidates during elections mainly with respect to speeches, polling day, polling booths, election manifestos, processions and general conduct. It aims to ensure free and fair elections."
    },
    {
      id: 'fp-in',
      title: 'First-Past-The-Post',
      level: 'Intermediate',
      time: '7 min',
      icon: 'CheckCircle',
      content: "India follows the 'First-Past-The-Post' system for its general elections to the Lok Sabha. In this system, a candidate who gets the most votes in a constituency is declared elected. The candidate does not need to secure more than 50% of the total votes cast to win."
    }
  ]
};
