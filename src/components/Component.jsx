import Link from "next/link";
import { Navbar, Sidebar } from "flowbite-react";
import {
  HiArrowCircleLeft,
  HiBookOpen,
  HiChartPie,
  HiViewBoards,
} from "react-icons/hi";

export default function Component() {
  return (
    <>
      <Navbar fluid rounded className="bg-gray-800">
        <Navbar.Brand href="/">
          <img
            src="/assets/logo_iotense.png"
            className="mr-3 h-6 sm:h-9"
            alt="IoTense Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            IoTense
          </span>
        </Navbar.Brand>
      </Navbar>
      <Sidebar
        className="[&>div]:bg-gray-800 fixed top-13 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex align-content-between flex-col "
        aria-label="sidebar with multi-level dropdown "
      >
        <Sidebar.ItemGroup className="space-y-2 font-medium flex-1 px-2 ">
          <Sidebar.Item
            href="/dashboard"
            icon={HiBookOpen}
            className="text-white hover:bg-gray-700"
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={HiViewBoards}
            label="Patient"
            className="text-white hover:bg-gray-700"
          >
            <Sidebar.Item
              href="/patient"
              className="text-white hover:bg-gray-700"
            >
              Patient
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href="/sensorData/chart"
            icon={HiChartPie}
            className="text-white hover:bg-gray-700"
          >
            chart
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="">
          <Sidebar.Item
            href="/"
            icon={HiArrowCircleLeft}
            className="text-white hover:bg-gray-700"
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar>
    </>
  );
}
