import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import marked from  'marked'

//import LibTask from '../../libs/LibTask';
import Layout from '../../components/layout'
import LibCommon from '../../lib/LibCommon'
import LibCms from '../../lib/LibCms'
//
export default function Page({ blog }) {
  // console.log(blog)
  return (
  <div className="bg-gray-100">
    <Layout>
      <Head><title key="title">{blog.title}</title></Head>      
      <div className="container mx-auto px-5 py-2 bg-gray-100">
        <Link href="/" >
          <a className="btn-outline-blue my-2">Back</a>
        </Link>
        <hr className="mt-2 mb-2" />
        <div className="show_head_wrap text-gray-900 font-bold text-2xl mb-1">
            <i className="fas fa-home"></i> >
            {blog.title}
        </div>
        <hr className="my-2" />
        <div className="show_title_wrap p-2 mb-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-gray-900 font-bold text-5xl my-2 mx-2">{blog.title}
          </h1>
          <p>Date: {blog.created_at}</p>
        </div>
        <hr />
        <div className="show_body_wrap bg-white p-2 shadow-lg rounded-lg">
          <div id="post_item" dangerouslySetInnerHTML={{__html: `${blog.content}`}}>
          </div>
        </div>
        <hr />                 
      </div>
      <style>{`
        div#post_item > p > img{
          max-width : 100%;
          height : auto;
        }
        div#post_item > hr {
          height: 1px;
          background-color: #000;
          border: none;
        }
        .show_head_wrap{ font-size: 1.4rem; }
        div#post_item > ul{
          list-style-type: disc;
          margin: 1rem 1rem;
        }
        div#post_item > h1{
          font-size: 3rem;
          font-weight: bold;
        }
        div#post_item > h3{
          font-size: 1.5rem;
          font-weight: bold;
        }  
      `}</style>      
    </Layout>
  </div>
  )
}
//
export const getStaticPaths = async () => {
  var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
  var url = process.env.MY_JSON_URL+ '?' + dt
  const req = await fetch( url );
  const json = await req.json();  
  var page_items = json.page_items
  var paths = []
  page_items.map((item, index) => {
    var row = { params: 
      { id: item.save_id } 
    }
    paths.push(row)
  })
//console.log(page_items)
  return {
    paths: paths,
    fallback: false
  } 
};
export const getStaticProps = async context => {
  const id = context.params.id
console.log(id)
  var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
  var url = process.env.MY_JSON_URL+ '?' + dt
  const req = await fetch( url );
  const json = await req.json();  
  var items = json.page_items 
  items = LibCommon.convert_items(items)
  var item  = LibCms.get_page_item( items, String(id) )
  item.content = marked(item.content)
//console.log(item )  
// console.log(json_categ)
  return {
    props: { 
      blog: item,
//      category_name: category_name
    },
  }
  
};
