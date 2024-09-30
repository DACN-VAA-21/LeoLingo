import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
  return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
      <Button> Default</Button>
      <Button variant="primary"> Hello</Button>

      <Button variant="primaryOutline">Primary OutLine</Button>
      <Button variant="secondary"> Secondary</Button>

      <Button variant="secondaryOutline">Secondary OutLine</Button>
      <Button variant="danger"> Danger</Button>

      <Button variant="dangerOutline">Danger OutLine</Button>
      <Button variant="super"> Super</Button>

      <Button variant="superOutline">Super OutLine</Button>
      <Button variant="ghost"> Ghost</Button>
      <Button variant="sidebarOutline">sidebar OutLine</Button>
      <Button variant="sidebar"> sidebar</Button>
    </div>
  );
};
export default ButtonsPage;
