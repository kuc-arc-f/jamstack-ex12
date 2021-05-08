import Link from 'next/link';
import Head from 'next/head';
//
export default function Page(props){
//  console.log(props)
  var paginateDisp = props.paginateDisp
  var nextPage = parseInt(props.page) + 1
  return (
  <div>
    { paginateDisp ? (
    <div className="paginate_wrap mb-2 text-center">
      <div className="btn-group">
        <Link href="/page/1"><a className="btn-outline-blue my-2">
          1st</a></Link>
          <Link href={`/page/${nextPage}`}><a className="btn-outline-blue my-2">
          next </a></Link>
      </div>
    </div>
    ):"" 
    }    
  </div>
  );
}
