import Header from '@/components/Header';
import Quiz from '@/components/Quiz';
import ThreeWayHandshake from '@/components/ThreeWayHandshake';
import TopicCard from '@/components/TopicCard';
import TCPFlagsTable from '@/components/TCPFlagsTable';
import FilterExamples from '@/components/FilterExamples';
import { 
  Network, 
  Filter, 
  Handshake, 
  Flag, 
  Activity, 
  Hash,
  Radio
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container pb-20">
        {/* Quiz Section */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-mono mb-4">
              TEST YOUR KNOWLEDGE
            </span>
            <h2 className="text-3xl font-bold mb-4">TCP/IP Quiz Challenge</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Answer 5 questions about TCP protocols, Wireshark filters, and network fundamentals.
            </p>
          </div>
          <Quiz />
        </section>

        {/* Three-Way Handshake Animation */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-success/20 text-success text-sm font-mono mb-4">
              INTERACTIVE ANIMATION
            </span>
            <h2 className="text-3xl font-bold mb-4">TCP Connection Process</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Watch how TCP establishes a reliable connection using the three-way handshake.
            </p>
          </div>
          <ThreeWayHandshake />
        </section>

        {/* Topic Cards */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-mono mb-4">
              CORE CONCEPTS
            </span>
            <h2 className="text-3xl font-bold mb-4">Network Fundamentals</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TopicCard
              icon={Network}
              title="TCP Stream"
              description="Complete conversation between two devices using TCP"
              details={[
                'Reassembles packets into full data exchange',
                'Right-click → Follow → TCP Stream in Wireshark',
                'View entire communication in order'
              ]}
              color="primary"
            />
            <TopicCard
              icon={Filter}
              title="Display Filters"
              description="Limit what packets you see after capture"
              details={[
                'Filter by protocol: tcp, udp, icmp',
                'Filter by IP: ip.addr == 192.168.1.1',
                'Filter by port: tcp.port == 80'
              ]}
              color="accent"
            />
            <TopicCard
              icon={Handshake}
              title="Three-Way Handshake"
              description="TCP connection establishment process"
              details={[
                'SYN: Client initiates connection',
                'SYN-ACK: Server acknowledges',
                'ACK: Connection established'
              ]}
              color="success"
            />
            <TopicCard
              icon={Flag}
              title="TCP Flags"
              description="Control bits indicating packet type"
              details={[
                'SYN, ACK for connection setup',
                'FIN for graceful close',
                'RST for immediate reset'
              ]}
              color="primary"
            />
            <TopicCard
              icon={Activity}
              title="TCP Window"
              description="Flow control mechanism"
              details={[
                'Defines data sent before waiting for ACK',
                'Larger window = faster transfer',
                'Visible in packet details'
              ]}
              color="accent"
            />
            <TopicCard
              icon={Hash}
              title="Sequence Numbers"
              description="Track order of bytes sent"
              details={[
                'Random initial number on SYN',
                'Ensures no data loss or duplication',
                'Both sides synchronize numbers'
              ]}
              color="success"
            />
          </div>
        </section>

        {/* Reference Tables */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-mono mb-4">
              QUICK REFERENCE
            </span>
            <h2 className="text-3xl font-bold mb-4">Cheat Sheets</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <TCPFlagsTable />
            <FilterExamples />
          </div>
        </section>

        {/* ICMP Section */}
        <section className="glass-card rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Radio className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Capturing ICMP Packets</h3>
              <p className="text-muted-foreground mb-6">
                ICMP (Internet Control Message Protocol) is used for network testing and the <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">ping</code> command.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="text-3xl mb-2">1️⃣</div>
                  <h4 className="font-semibold mb-1">Start Capture</h4>
                  <p className="text-sm text-muted-foreground">Select network interface and click Start</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="text-3xl mb-2">2️⃣</div>
                  <h4 className="font-semibold mb-1">Generate Traffic</h4>
                  <p className="text-sm text-muted-foreground font-mono">ping google.com</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="text-3xl mb-2">3️⃣</div>
                  <h4 className="font-semibold mb-1">Apply Filter</h4>
                  <p className="text-sm text-muted-foreground font-mono">icmp</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>TCP/IP & Wireshark Learning Lab • Interactive Network Education</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
