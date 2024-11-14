'use client'

import { useState } from 'react'
import { Archive, Bell, Calendar, ChevronDown, ChevronLeft, ChevronRight, Clock, Copy, Home, Inbox, Link, Menu, MoreHorizontal, PenSquare, Search, Send, Settings, Share, Star, Trash2, UserRound, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Sample email data
const emails = [
  {
    id: 1,
    sender: 'Microsoft hesabi ekibi',
    senderEmail: 'xcprinf@outlook.com',
    avatar: '/placeholder.svg?height=40&width=40',
    subject: 'Microsoft hesabiniza yeni uygulamalar bağlandı',
    preview: 'Microsoft hesabi Verilerinize eri...',
    content: `Microsoft hesabı

Verilerinize erişen yeni uygulamalar var

Spark, xc**f@outlook.com adlı Microsoft hesabına bağlandı.

Bu erişim iznini siz vermediyseniz lütfen uygulamaları hesabınızdan kaldırın.

Ayrıca güvenlik bildirimlerini almamayı seçebilir veya bildirimleri alacağınız yeri değiştirebilirsiniz.

Teşekkürler,
Microsoft hesabı ekibi

Gizlilik Bildirimi
Microsoft Corporation, One Microsoft Way, Redmond, WA 98052`,
    time: '11:22 PM',
    date: '13 Nov',
    isRead: false
  },
  {
    id: 2,
    sender: 'Google',
    senderEmail: 'no-reply@google.com',
    avatar: '/placeholder.svg?height=40&width=40',
    subject: 'Security alert',
    preview: 'Spark was granted access to yo...',
    content: 'Security alert content...',
    time: '11:17 PM',
    date: '13 Nov',
    isRead: true
  },
]

const SidebarButton = ({ icon: Icon, children, isActive = false, isCollapsed }) => (
  <Button 
    variant="ghost" 
    className={`w-full justify-start gap-3 px-2 font-normal transition-all duration-300 ease-in-out ${
      isActive ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'hover:bg-gray-100'
    } ${isCollapsed ? 'px-0 justify-center' : ''}`}
  >
    <Icon className="h-4 w-4 flex-shrink-0" />
    {!isCollapsed && <span>{children}</span>}
  </Button>
)

const Sidebar = ({ isCollapsed }) => (
  <div className={`flex-shrink-0 border-r bg-white transition-all duration-300 ease-in-out ${
    isCollapsed ? 'w-[60px]' : 'w-[240px]'
  }`}>
    <div className="flex h-full flex-col">
      <div className="space-y-1 p-2">
        <SidebarButton icon={Home} isCollapsed={isCollapsed}>Home</SidebarButton>
        <SidebarButton icon={Inbox} isActive isCollapsed={isCollapsed}>Inbox</SidebarButton>
        <SidebarButton icon={Star} isCollapsed={isCollapsed}>Starred</SidebarButton>
        <SidebarButton icon={PenSquare} isCollapsed={isCollapsed}>Drafts</SidebarButton>
        <SidebarButton icon={Send} isCollapsed={isCollapsed}>Sent</SidebarButton>
        <SidebarButton icon={Trash2} isCollapsed={isCollapsed}>Trash</SidebarButton>
      </div>
      {!isCollapsed && (
        <>
          <div className="mt-6">
            <div className="px-4 py-2">
              <p className="text-xs font-medium text-gray-500">Folders</p>
            </div>
            <div className="space-y-1 p-2">
              <SidebarButton icon={Archive} isCollapsed={isCollapsed}>Archive</SidebarButton>
              <SidebarButton icon={ChevronDown} isCollapsed={isCollapsed}>More</SidebarButton>
            </div>
          </div>
          <div className="mt-auto space-y-1 p-2">
            <SidebarButton icon={Calendar} isCollapsed={isCollapsed}>Calendar</SidebarButton>
            <SidebarButton icon={Settings} isCollapsed={isCollapsed}>Settings</SidebarButton>
          </div>
        </>
      )}
    </div>
  </div>
)

const EmailListItem = ({ email, isSelected, onClick }) => (
  <div
    className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 ${
      isSelected ? 'bg-gray-50' : ''
    }`}
    onClick={onClick}
  >
    <div className="flex gap-4">
      <img src={email.avatar} alt="" className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className={`text-sm ${!email.isRead ? 'font-medium' : ''}`}>{email.sender}</span>
          <span className="text-xs text-gray-500">{email.time}</span>
        </div>
        <p className={`text-sm ${!email.isRead ? 'font-medium' : ''}`}>{email.subject}</p>
        <p className="text-xs text-gray-500">{email.preview}</p>
      </div>
    </div>
  </div>
)

const EmailList = ({ emails, selectedEmail, setSelectedEmail, toggleSidebar }) => (
  <div className="w-[400px] flex-shrink-0 border-r">
    <div className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSidebar}>
          <Menu className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">Today</span>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="divide-y">
      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          isSelected={selectedEmail?.id === email.id}
          onClick={() => setSelectedEmail(email)}
        />
      ))}
    </div>
  </div>
)

const EmailContent = ({ email }) => (
  <div className="h-full">
    <div className="flex h-14 items-center justify-between border-b px-4">
      <h1 className="text-lg font-medium">{email.subject}</h1>
      <div className="flex items-center gap-1">
        {[Bell, Clock, Trash2, Share, MoreHorizontal].map((Icon, index) => (
          <Button key={index} variant="ghost" size="icon" className="h-8 w-8">
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </div>
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={email.avatar} alt="" className="h-12 w-12 rounded-full" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{email.sender}</span>
              <span className="text-sm text-gray-500">&lt;{email.senderEmail}&gt;</span>
            </div>
            <div className="text-sm text-gray-500">
              {email.date}, {email.time}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 text-sm">
        {email.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  </div>
)

export default function EmailClient() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isCollapsed={isCollapsed} />
      <EmailList 
        emails={emails} 
        selectedEmail={selectedEmail} 
        setSelectedEmail={setSelectedEmail}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1">
        {selectedEmail ? (
          <EmailContent email={selectedEmail} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  )
}