import React from 'react'
import Link from 'next/link';
import Head from 'next/head';

import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import LibCommon from '../../lib/LibCommon'
import LibCms from '../../lib/LibCms'
//
function Page(data) {
  var items = data.blogs
  var category_name = data.category_name
//console.log("display=", data.display)  
  return (
  <div className="bg-gray-100">
    <Layout>
      <Head><title key="title">{category_name} | {data.site_name}</title>
      </Head>
      <div className="body_main_wrap">
        <div className="container mx-auto px-5 py-2 bg-gray-100">
          <Link href="/" >
            <a className="btn-outline-blue my-2">Back</a>
          </Link>          
          <div className="body_wrap">
            <div id="post_items_box" className="row conte mt-2 mb-4">
              <div className="col-sm-12">
                <div id="div_news">
                  <h3 className="text-3xl myblog_color_accent font-bold mb-4" >Category : {category_name}
                  </h3>
                </div>
                <hr />
              </div>
              {items.map((item, index) => {
  // console.log(item )
                return (<IndexRow key={index}
                  id={item.save_id} title={item.title}
                  date={item.created_at} />       
                )
              })}
            </div>
            <br /><br />
          </div>          
        </div>
      </div>
    </Layout>
  </div>
  )  
}
//
export const getStaticProps = async context => {
  const id = context.params.id;
console.log("id=", id )
  var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
  var url = process.env.MY_JSON_URL+ '?' + dt
  const req = await fetch( url );
  const json = await req.json();  
  var items = json.items 
  items =  LibCommon.get_reverse_items(items)
  items = LibCms.get_category_items(items, id)
  var category = LibCms.get_category_item(json.category_items, id)
//console.log(category)
  return {
    props : {
      blogs: items, display: 0, 
      site_name : process.env.MY_SITE_NAME,
      category_name: category.name,
    }
  };
}
//
export const getStaticPaths = async () => {
  var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
  var url = process.env.MY_JSON_URL+ '?' + dt
  const req = await fetch( url );
  const json = await req.json();  
  var items = json.category_items     
  var paths = []
  items.map((item, index) => {
    var row = { params: 
      { id: item.save_id } 
    }
    paths.push(row)
  })
//console.log(paths)
  return {
    paths: paths,
    fallback: false
  } 
};

export default Page
