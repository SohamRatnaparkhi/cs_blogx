import Sidebar from '@/components/blog/Sidebar';
import Widgets from '@/components/blog/Widgets';
import Navbar from '@/components/ui/Navbar';
import React from 'react'

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const styles = {
        wrapper:
            "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
        columns:
            "flex justify-between h-screen w-full text-center  text-white gap-0.5",
        sides: "hidden lg:inline lg:basis-1/4 bg-slate-900 h-full overflow-y-auto",
        side2: "lg:basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
        feed: "lg:basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto px-4 no-scrollbar",
        widgets: "hidden lg:inline lg:basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
    };
    return (
        <html lang="en">
            <body>
                <div>
                    <Navbar />
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.columns}>
                        <div className={styles.sides}>
                            <Sidebar />
                        </div>
                        <div className={styles.side2}>
                            <div className={styles.feed}>
                                {children}
                            </div>
                            <div className={styles.widgets}>
                                <Widgets />
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default layout
