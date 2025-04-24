export interface TraitProps extends React.PropsWithChildren {
  label: string;
}

const Trait: React.FC<TraitProps> = ({ label, children }) => {
  return (
    <p>
      <span className="fw-bold">{label}: </span>
      {children}
    </p>
  );
};

export default Trait;
