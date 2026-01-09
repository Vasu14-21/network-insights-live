export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'simple' | 'medium';
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the first step in TCP's Three-Way Handshake?",
    options: [
      "Client sends SYN to server",
      "Server sends SYN-ACK to client",
      "Client sends ACK to server",
      "Server sends FIN to client"
    ],
    correctAnswer: 0,
    difficulty: 'simple',
    explanation: "The client initiates the connection by sending a SYN (Synchronize) packet to the server."
  },
  {
    id: 2,
    question: "Which Wireshark filter would you use to display only TCP packets?",
    options: [
      "filter tcp",
      "tcp",
      "show tcp",
      "display.tcp"
    ],
    correctAnswer: 1,
    difficulty: 'simple',
    explanation: "In Wireshark, simply typing 'tcp' in the display filter shows only TCP packets."
  },
  {
    id: 3,
    question: "What does the SYN flag in TCP indicate?",
    options: [
      "Connection termination request",
      "Data acknowledgment",
      "Urgent data present",
      "Connection initiation/synchronization"
    ],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: "SYN (Synchronize) flag is used to initiate a TCP connection and synchronize sequence numbers."
  },
  {
    id: 4,
    question: "What protocol does the 'ping' command use?",
    options: [
      "TCP",
      "UDP",
      "ICMP",
      "HTTP"
    ],
    correctAnswer: 2,
    difficulty: 'simple',
    explanation: "ICMP (Internet Control Message Protocol) is used by ping for network testing and diagnostics."
  },
  {
    id: 5,
    question: "What does TCP Window Size control?",
    options: [
      "Amount of data sent before waiting for acknowledgment",
      "Maximum packet size allowed",
      "Number of retransmission attempts",
      "Time to wait before timeout"
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: "TCP Window Size defines how much data can be sent before waiting for an acknowledgment from the receiver."
  }
];
