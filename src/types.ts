export interface Item {
    id: number;
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    address: string;
    phone: string;
  }
  
  export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
  }