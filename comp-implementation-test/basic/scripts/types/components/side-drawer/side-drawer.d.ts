export declare class SideDrawer {
  drawerTitle: string;
  opened: boolean;
  showContact: boolean;
  open(): Promise<void>;
  close(): void;
  onContentChange(content: string): void;
  render(): any[];
}
