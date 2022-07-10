import GridItem from "./GridItem";

const GridView = ({ items }: any) => (
  <div className="flex gap-3 mt-5">
    {items.map((item: any) => (
      <GridItem key={item.id} item={item} />
    ))}
  </div>
);

export default GridView;
