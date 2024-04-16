const compression = require("compression");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const app = express();
const port = 8080;
require("dotenv").config();
app.use(compression());
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true })); // cors 허용
app.use(express.json());

//네이버API관련
// const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
// const naverClientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
// const naverApiBaseUrl = "https://openapi.naver.com/v1/search/book.json";

//알라딘API관련
// const aladinApiKey = process.env.REACT_APP_ALADIN_API_KEY;
const aladinApiKey = "ttbdudgh46512353001";
const aladinApiBaseUrl = "https://www.aladin.co.kr/ttb/api/";


//1. 상품 검색 API
//ItemSearch.aspx
  // Query : 검색어 (문자열) (필수값)  
  // start : 1이상, 양의 정수 (기본값:1)           //검색결과 시작페이지  
  // MaxResults : 1이상 100이하 양의정수 (기본값:10) //검색결과 한페이지당 최대 출력개수  
  // Sort (기본값 : Accuracy)
  //   ㄴ Accuracy : 관련도 
  //   ㄴ PublishTime : 출간일
  //   ㄴ Title : 제목
  //   ㄴ SalesPoint : 판매량
  //   ㄴ CustomerRating 고객평점
  //   ㄴ MyReviewCount :마이리뷰갯수
  // categoryId : //양의정수 - 분야의 고유 번호(기본값:0, 전체) (참고 : 알라딘 모든 분야 카테고리)  
app.get("/search", async (req, res) => {
  const {query, start, maxResults, sort, categoryId} = req.query;  
  // aladinApiUrl = `${aladinApiBaseUrl}ItemSearch.aspx?ttbkey=${aladinApiKey}&Query=${query}&MaxResults=${maxResults}&start=${start}&Sort=${sort}&SearchTarget=Book&output=js&Cover=Big&Version=20131101&CategoryId`;
  aladinApiUrl = `${aladinApiBaseUrl}ItemSearch.aspx?ttbkey=${aladinApiKey}&Query=${query}&MaxResults=${maxResults}&start=${start}&Sort=${sort}&CategoryId=${categoryId}&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;
  

  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
    console.log("req.query",req.query)
    console.log("aladinApiUrl", aladinApiUrl)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }    
});


//2 상품리스트 API
//이슈사항: 파라미터를 넘기면 node에서는 조회되는데 front로 값이 넘어오지 않는다....

//2-1. 상품 리스트 API (베스트셀러)
//ItemList.aspx
  // QueryType 
  //   ㄴ Bestseller : 베스트셀러  
app.get("/bestseller", async (req, res) => {
  const queryType = "Bestseller";
  const aladinApiUrl = `${aladinApiBaseUrl}ItemList.aspx?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=50&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//2-2. 상품 리스트 API (신간전체리스트)
//ItemList.aspx
  // QueryType 
  //   ㄴ ItemNewAll : 신간전체리스트
app.get("/itemNewAll", async (req, res) => {
  const queryType = "ItemNewAll";
  const aladinApiUrl = `${aladinApiBaseUrl}ItemList.aspx?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=50&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;  

  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//3. 상품 조회 API 
//ItemLookUp.aspx
//isbn : 상품을 구분짓는 유일한 값 (필수값)
app.get("/detail", async (req, res) => {
  const {isbn} = req.query;  
  const  aladinApiUrl = `${aladinApiBaseUrl}ItemLookUp.aspx?ttbkey=${aladinApiKey}&itemIdType=ISBN&ItemId=${isbn}&output=js&Cover=Big&Version=20131101&OptResult=ebookList,usedList,reviewList`;
  
  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
    //console.log(data)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }    
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});


const fetchData = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error("에러 발생");
  }
};
app.use(
  compression({
    level: 6,
    threshold: 2 * 1024,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);










////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //2. 상품 리스트 API
// //ItemList.aspx
//   // QueryType 
//   //   ㄴ Bestseller : 베스트셀러
//   //   ㄴ ItemNewAll : 신간 전체 리스트
//   //   ㄴ ItemNewSpecial : 주목할 만한 신간 리스트
//   //   ㄴ ItemEditorChoice : 편집자 추천 리스트 (카테고리로만 조회 가능 - 국내도서/음반/외서만 지원)  
//   //   ㄴ BlogBest : 블로거 베스트셀러 (국내도서만 조회 가능)
//   // start : 1이상, 양의 정수(기본값:1)           //검색결과 시작페이지  
//   // MaxResults : 1이상 100d이하 양의정수 기본값1 //검색결과 한페이지당 최대 출력개수
//   // CategoryId : 양의정수 - 분야의 고유 번호(기본값:0, 전체) (참고 : 알라딘 모든 분야 카테고리) 특정 분야로 검색결과를 제한함
//   app.get("/ItemList", async (req, res) => {

//     const queryType = "Bestseller";
  
//     // const {page} = req.query;
//     const aladinApiUrl = `${aladinApiBaseUrl}ItemList.aspx?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;
//     // const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=${page}&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;
  
//     try {
//       const data = await fetchData(aladinApiUrl);
//       res.json(data);
  
//       console.log("bestsellerurl data", data);
//       console.log("bestsellerurl", aladinApiUrl);    
//       console.log("bestsellerurl req", req.query);
  
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
  

// //1. 상품 검색 API
// //ItemSearch.aspx
// app.get("/search", async (req, res) => {

//   const {Query, start} = req.query;
//   aladinApiUrl = `${aladinApiSearchUrl}?ttbkey=${aladinApiKey}&Query=${Query}&MaxResults=20&start=${start}&SearchTarget=Book&output=js&Cover=Big&Version=20131101&CategoryId`;

//   try {
//     const data = await fetchData(aladinApiUrl);
//     res.json(data);
//     console.log("req.query",req.query)
//     console.log("aladinApiUrl", aladinApiUrl)
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }    
// });


// app.get("/bestseller", async (req, res) => {
//   const queryType = "Bestseller";

//   console.log("reqtest", req.query);
//   // console.log("bestsellerurl", aladinApiUrl);

//   const {page} = req.query;
//   // const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;
//   const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=${page}&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

//   //const {page} = req.query;
//   //&start=${page}
//   //이렇게 설정해놓고 조회하는데 react쪽에서 값을 안넘겨주면
  
//   // const fetchBestsellerBook=()=>{
//   //   return apiBook.get(`/bestseller`);
//   // };

//   //node쪽에서 만들어지는 url에는
//   //start=undefined
//   //라고 url이 만들어지고 기본값으로 결과값이 조회된다.

//   try {
//     const data = await fetchData(aladinApiUrl);
//     res.json(data);

//     console.log("bestsellerurl data", data);
//     console.log("bestsellerurl", aladinApiUrl);    

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// app.get("/newbooks", async (req, res) => {
//   const queryType = "ItemNewAll";
//   const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

//   try {
//     const data = await fetchData(aladinApiUrl);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// app.get("/special", async (req, res) => {
//   const queryType = "ItemNewSpecial";
//   const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;

//   try {
//     const data = await fetchData(aladinApiUrl);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// app.get("/detail", async (req, res) => {

//   // const { isbn, key } = req.query;
//   const {isbn} = req.query;

//   // console.log(req.query);  
//   // const  aladinApiUrl = `${aladinApiLookUpUrl}?ttbkey=${key}&itemIdType=ISBN&ItemId=${isbn}&output=js&Cover=Big&Version=20131101&OptResult=ebookList,usedList,reviewList`;
//    const  aladinApiUrl = `${aladinApiLookUpUrl}?ttbkey=${aladinApiKey}&itemIdType=ISBN&ItemId=${isbn}&output=js&Cover=Big&Version=20131101&OptResult=ebookList,usedList,reviewList`;
  
//   try {
//     const data = await fetchData(aladinApiUrl);
//     res.json(data);
//     //console.log(data)
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }    

// });
