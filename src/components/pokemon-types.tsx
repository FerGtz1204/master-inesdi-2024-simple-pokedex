import "./pokemon-types.css";

interface TypeLabelProps {
  type: string;
}

const TypeBadge: React.FC<TypeLabelProps> = ({ type }) => {
  const className = `type-label type-${type}`;
  return <span className={className}>{type}</span>;
};

interface TypesDisplayProps {
  types: string[];
  title: string;
}

const TypesDisplay: React.FC<TypesDisplayProps> = ({ types, title }) => (
  <div className="types-display"> 
    <h3 className="type-title">{title}</h3>
    <ul className="type-list"> {}
      {types.map((type) => (
        <li key={type}>
          <TypeBadge type={type} />
        </li>
      ))}
    </ul>
  </div>
);

export default TypesDisplay;