import SideNav from '../sideNav/SideNav';

export default function DefaultLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen justify-between w-full flex-row">
      <SideNav />
      <div className="flex flex-row rounded p-2 w-full mb-8 h-full">
        <div className="p-3 m-2 grow rounded">{children}</div>
      </div>
    </div>
  );
}
