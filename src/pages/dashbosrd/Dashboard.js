import React from 'react'
import { Outlet } from 'react-router-dom';
import MySidebar from '../../Navigation/sidebar';


export default function Dashboard() {
    return (
        <div>
            <MySidebar>
                <Outlet />
            </MySidebar>
        </div>
    )
}
