"use client";

import Feed from '@/components/blog/Feed';
import Sidebar from '@/components/blog/Sidebar';
import Widgets from '@/components/blog/Widgets';
import Navbar from '@/components/ui/Navbar';
import React from 'react'
import { usePathname } from 'next/navigation';
import { SidebarOptions } from '@/constants/app.constants';

const BlogMainPage = () => {

  return (
    <div>
      <Feed />
    </div>
  )
}

export default BlogMainPage
