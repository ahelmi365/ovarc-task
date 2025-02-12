import SellButton from "../SellButton";
interface StoreInfoProps {
  storeName: string;
  price: string;
}

const StoreInfo = ({ storeName, price }: StoreInfoProps) => {
  return (
    <>
      <div>{storeName}</div>
      <div>{price}</div>
      <SellButton />
    </>
  );
};

export default StoreInfo;
