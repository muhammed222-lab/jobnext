import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  ArrowLeft,
  Users,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  senderType: "applicant" | "employer";
  senderName: string;
}

interface ChatUser {
  id: string;
  name: string;
  role: string;
  jobTitle?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

const Chat = () => {
  const [searchParams] = useSearchParams();
  const applicantId = searchParams.get("applicant");
  
  const [selectedChat, setSelectedChat] = useState<string | null>(applicantId);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data - In production, this would come from Supabase with real-time updates
  const [chatUsers] = useState<ChatUser[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      jobTitle: "Senior Frontend Developer",
      lastMessage: "Thank you for considering my application. I'm very excited about this opportunity!",
      lastMessageTime: "2m ago",
      unreadCount: 2,
      online: true
    },
    {
      id: "2", 
      name: "Mike Chen",
      role: "Product Manager",
      jobTitle: "Senior Frontend Developer",
      lastMessage: "I have some questions about the tech stack you're using.",
      lastMessageTime: "1h ago",
      unreadCount: 0,
      online: false
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "UX Designer", 
      jobTitle: "Product Manager",
      lastMessage: "Could we schedule a call to discuss the role further?",
      lastMessageTime: "3h ago",
      unreadCount: 1,
      online: true
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm very interested in the Senior Frontend Developer position. I have 6 years of experience with React and TypeScript.",
      timestamp: new Date(Date.now() - 3600000),
      senderId: "1",
      senderType: "applicant",
      senderName: "Sarah Johnson"
    },
    {
      id: "2",
      content: "Hi Sarah! Thank you for your interest. I've reviewed your portfolio and I'm impressed with your work. Could you tell me more about your experience with large-scale applications?",
      timestamp: new Date(Date.now() - 3000000),
      senderId: "employer",
      senderType: "employer", 
      senderName: "TechCorp HR"
    },
    {
      id: "3",
      content: "Absolutely! At my current company, I've been working on a platform that handles over 100k daily active users. I led the frontend architecture redesign that improved performance by 40%.",
      timestamp: new Date(Date.now() - 1800000),
      senderId: "1",
      senderType: "applicant",
      senderName: "Sarah Johnson"
    },
    {
      id: "4",
      content: "That's impressive! We're also dealing with scale challenges. Would you be available for a technical interview next week?",
      timestamp: new Date(Date.now() - 900000),
      senderId: "employer",
      senderType: "employer",
      senderName: "TechCorp HR"
    },
    {
      id: "5",
      content: "Yes, I'd love to! I'm available Monday through Wednesday afternoon. Thank you for considering my application. I'm very excited about this opportunity!",
      timestamp: new Date(Date.now() - 120000),
      senderId: "1",
      senderType: "applicant",
      senderName: "Sarah Johnson"
    }
  ]);

  const selectedUser = chatUsers.find(user => user.id === selectedChat);
  const filteredUsers = chatUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        timestamp: new Date(),
        senderId: "employer",
        senderType: "employer",
        senderName: "TechCorp HR"
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Messages
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect with job candidates and manage conversations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Conversations
                </CardTitle>
                <Badge variant="secondary">
                  {chatUsers.reduce((acc, user) => acc + user.unreadCount, 0)}
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedChat(user.id)}
                    className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors border-l-4 ${
                      selectedChat === user.id 
                        ? 'bg-secondary border-l-primary' 
                        : 'border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {user.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-muted-foreground">{user.lastMessageTime}</span>
                        {user.unreadCount > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                            {user.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {user.lastMessage}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback>
                            {selectedUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedUser.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedUser.name}</CardTitle>
                        <CardDescription>
                          Applied for: {selectedUser.jobTitle} • {selectedUser.online ? "Online" : "Offline"}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderType === 'employer' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.senderType === 'employer'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      } rounded-lg p-3`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderType === 'employer' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                <Separator />

                {/* Message Input */}
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-gradient-primary"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a candidate from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;