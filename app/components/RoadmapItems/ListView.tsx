import ListItem from "./GridItem";

const ListView = ({ items }: any) => (
  <div className="flex flex-col gap-3 mt-5">
    {items.map((item: any) => (
      <ListItem key={item.id} item={item} />
    ))}
  </div>
);

export default ListView;
