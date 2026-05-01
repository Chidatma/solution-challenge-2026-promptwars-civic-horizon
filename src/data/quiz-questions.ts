export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: Record<string, Question[]> = {
  US: [
    {
      id: 1,
      text: "How many total electoral votes are there in the U.S. presidential election?",
      options: ["435", "100", "538", "270"],
      correctAnswer: 2,
      explanation: "There are 538 total electors: 435 Representatives, 100 Senators, and 3 electors for the District of Columbia."
    },
    {
      id: 2,
      text: "Which amendment lowered the voting age to 18?",
      options: ["19th Amendment", "15th Amendment", "26th Amendment", "13th Amendment"],
      correctAnswer: 2,
      explanation: "The 26th Amendment, ratified in 1971, lowered the voting age from 21 to 18 in response to the Vietnam War."
    },
    {
      id: 3,
      text: "What is the minimum number of electoral votes needed to win the Presidency?",
      options: ["218", "270", "300", "538"],
      correctAnswer: 1,
      explanation: "A candidate must win a simple majority of electors, which is 270 out of 538."
    },
    {
      id: 4,
      text: "Which state does NOT use a 'winner-take-all' system for awarding electoral votes?",
      options: ["Florida", "California", "Maine", "Texas"],
      correctAnswer: 2,
      explanation: "Maine and Nebraska are the only two states that allocate their electoral votes proportionally."
    }
  ],
  IN: [
    {
      id: 1,
      text: "Who appoints the Chief Election Commissioner of India?",
      options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"],
      correctAnswer: 2,
      explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners."
    },
    {
      id: 2,
      text: "What is the maximum number of days for an election campaign in India as per ECI?",
      options: ["14 days", "21 days", "30 days", "60 days"],
      correctAnswer: 0,
      explanation: "The period of campaign is the period between the announcement of the election and the 48 hours before the conclusion of poll."
    },
    {
      id: 3,
      text: "What does VVPAT stand for in Indian Elections?",
      options: ["Voter Verifiable Paper Audit Trail", "Voter Verify Paper Audit Track", "Virtual Voter Paper Audit Trail", "Verified Voter Paper Account Trail"],
      correctAnswer: 0,
      explanation: "VVPAT stands for Voter Verifiable Paper Audit Trail, which allows voters to verify their votes cast via EVM."
    },
    {
      id: 4,
      text: "What is the minimum age to contest Lok Sabha elections in India?",
      options: ["18 years", "21 years", "25 years", "30 years"],
      correctAnswer: 2,
      explanation: "To contest for Lok Sabha elections, a person must be a citizen of India and at least 25 years old."
    }
  ]
};
