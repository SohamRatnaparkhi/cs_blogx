import Link from 'next/link';
import React from 'react'

const styles = {
    wrapper:
        "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg text-white hover:bg-gray-100 hover:bg-gray-700",
    inactive:
        "hover:bg-slate-700 font-normal hover:font-bold py-2 text-lg rounded-2xl text-white",
    active: "bg-cyan-700 font-bold py-2 rounded-2xl px-2 lg:px-4 lg:text-lg text-white",
    icon: "flex-shrink-0 w-10 text-gray-500 transition duration-75 text-gray-400 group-hover:text-gray-900 group-hover:text-white",
};

const SidebarOption = ({
    option,
    Icon,
    isActive,
    setSelected,
    redirect,
}: {
    option: string;
    Icon: any;
    isActive: boolean;
    setSelected: any;
    redirect: string;
}): React.ReactElement => {
    return (
        <div>
            <Link href={redirect}>
                <div
                    className={styles.wrapper}
                    onClick={() => {
                        setSelected(option);
                    }}
                >
                    <div className={styles.icon}>
                        <Icon color="#ffffff" />
                    </div>

                    <div className={isActive ? styles.active : styles.inactive}>
                        <pre>{option}</pre>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default SidebarOption
