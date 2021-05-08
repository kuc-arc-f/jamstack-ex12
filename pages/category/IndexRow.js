import Link from 'next/link';

const IndexRow = props => (
  <div className="post_items_wrap bg-white p-2 mb-4 rounded-lg shadow-lg">
    <div className="div_news_rows">
      <Link href={`/posts/${props.id}`} >
        <a target="_blank">
          <h3 className="text-gray-900 font-bold text-2xl mb-1"> {props.title}</h3>
        </a>
      </Link>        
    </div>
    <div>
      <ul className="ul_time_box">
          <li>
            <p className="mb-0">
                <span className="mr-2 time_icon_wrap">
                  <i className="far fa-calendar"></i>
                </span>
                {props.date} , ID : {props.id} <br />
            </p>  
          </li>
      </ul>
    </div>    
  </div>
);
export default IndexRow;
