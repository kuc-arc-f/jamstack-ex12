import Link from 'next/link';

const PagesRow = props => (
  <span>
      <Link href={`/pages/${props.save_id}`} >
        <a className="btn-outline-gray mr-2">
        {props.title}
        </a>
      </Link>        
  </span>
);
export default PagesRow;
