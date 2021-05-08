import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/layout'
import TopHeadBox from '../components/TopHeadBox'
import PagingBox from '../components/PagingBox'
import IndexRow from './IndexRow'
import PagesRow from './PagesRow'
import CategoryRow from './CategoryRow'
import LibCommon from '../lib/LibCommon'
import LibPagenate from '../lib/LibPagenate'

export default function Index(data) {
  var items = data.blogs
  var json = data.json
  var page_items = json.page_items
  var category_items = json.category_items
  var paginateDisp = data.display
// console.log( page_items )
  return (
    <div className="bg-gray-100">
    <Layout preview="">
      <Head>
        <title>{data.site_name}</title>
      </Head>
      <TopHeadBox site_name={data.site_name} info_text={data.info_text} />
      <div className="container mx-auto px-5 py-2 bg-gray-100">
        <div className="btn_disp_ara_wrap">
          <div className="pages_wrap bg-white p-2 mb-4 rounded-lg shadow-lg">
            <h3 className="text-3xl myblog_color_accent font-bold mb-4" >Pages
            </h3>
            <div className="page_btn_wrap my-2">
            {page_items.map((item, index) => {
    // console.log(item.show_id ,item.created_at )
              return (<PagesRow save_id={item.save_id} key={index} 
                title={item.title} />) 
            })}            
            </div>
          </div>
          <div className="category_wrap bg-white p-2 rounded-lg shadow-lg">
            <h3 className="text-3xl myblog_color_accent font-bold mb-4" >Category
            </h3>
            <div className="category_btn_wrap my-2">
              {category_items.map((item, index) => {
// console.log(item )
                return (<CategoryRow id={item.save_id} key={index} 
                  name={item.name} />
                )
              })}              
            </div>            
          </div>
        </div>
        <div className="p-1">
          <h3 className="text-3xl myblog_color_accent font-bold">Posts</h3>
        </div>        
        {items.map((item, index) => {
// console.log(item )
          var category_name = item.category.name
          return (
            <IndexRow key={index}
            id={item.id} save_id={item.save_id} title={item.title}
            date={item.created_at} category_name={category_name} />       
          )          
        })}
        <hr className="my-4" />
        <PagingBox page="1" paginateDisp={paginateDisp} />
      </div>
    </Layout>
    </div>
  )
}

export async function getStaticProps() {
  var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
  var url = process.env.MY_JSON_URL+ '?' + dt
  const req = await fetch( url );
  const json = await req.json();  
  var items = json.items 
  items =  LibCommon.get_reverse_items(items)
// console.log( "len=", items.length)  
  LibPagenate.init()
  items = LibPagenate.getOnepageItems(items, 0 , 20)  
  var display = LibPagenate.is_paging_display(items.length)      
  return {
    props : {
      blogs: items,
      json: json,
      site_name : process.env.MY_SITE_NAME,
      info_text : process.env.MY_SITE_INFO,        
      display: display
    }
  };
}
