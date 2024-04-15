// const compression = require("compression");
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const axios = require("axios");
// const app = express();
// const port = 8080;
// require("dotenv").config();
// app.use(compression());
// app.use(morgan("dev"));
// // app.use(cors());
// app.use(cors({ origin: true, credentials: true })); // cors 허용
// app.use(express.json());

// // const aladinApiKey = process.env.REACT_APP_ALADIN_API_KEY;
// const aladinApiKey = "ttbdudgh46512353001";
// const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
// const naverClientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

// const aladinApiBaseUrl = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";
// const aladinApiSearchUrl = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";
// const aladinApiLookUpUrl = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";
// const naverApiBaseUrl = "https://openapi.naver.com/v1/search/book.json";

// const fetchData = async (url, headers = {}) => {
//   try {
//     const response = await axios.get(url, { headers });
//     return response.data;
//   } catch (error) {
//     throw new Error("에러 발생");
//   }
// };
// app.use(
//   compression({
//     level: 6,
//     threshold: 2 * 1024,
//     filter: (req, res) => {
//       if (req.headers["x-no-compression"]) {
//         return false;
//       }
//       return compression.filter(req, res);
//     },
//   })
// );



// // app.get("/search/book", async (req, res) => {
// //   // 클라이언트가 보낸 쿼리값을 받아서
// //   const { searchQuery } = req.query;
// //   const url = `http://www.aladin.co.kr/~${encodeURIComponent(searchQuery)}`;

// //   try {
// //     // 알라딘 서버에 검색 요청
// //     const {
// //       data: { item: result },
// //     } = await axios.get(url);
// //     // 응답을 받으면 클라이언트에게 전달
// //     if (result) res.status(200).send(result);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // });


// app.get("/bestseller", async (req, res) => {
//   const queryType = "Bestseller";
//   const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&CategoryId&Version=20131101`;

//   //console.log("req", req);

//   try {
//     const data = await fetchData(aladinApiUrl);
//     res.json(data);
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



// app.get("/search", async (req, res) => {

//   // const { isbn } = req.query;
//   // const  aladinApiUrl = `${aladinApiLookUpUrl}?ttbkey=${aladinApiKey}&itemIdType=ISBN&ItemId=${isbn}&output=js&Cover=Big&Version=20131101&OptResult=ebookList,usedList,reviewList`;
//   // //const aladinApiUrl = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbdudgh46512353001&itemIdType=ISBN&ItemId=K392930572&output=xml&Version=20131101&OptResult=ebookList,usedList,reviewList`;    
                         

//   // try {
//   //   const data = await fetchData(aladinApiUrl);
//   //   res.json(data);
//   //   //console.log(data)
//   // } catch (error) {
//   //   res.status(500).json({ error: error.message });
//   // }    

// ///////////////////작동
//     const aladinApiUrl = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttbdudgh46512353001&itemIdType=ISBN&ItemId=K392930572&output=xml&Version=20131101&OptResult=ebookList,usedList,reviewList`;    


//     try {
//       const data = await fetchData(aladinApiUrl);
//       res.json(data);
//       console.log(data)
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }    
// });







// // app.get("/search", async (req, res) => {
// //   try {
// //     const { isbn, searchQuery } = req.query;
// //     let naverApiUrl = "";
// //     let aladinApiUrl = "";

// //     if (!isbn && !searchQuery) {
// //       return res
// //         .status(400)
// //         .json({ error: "ISBN 정보 또는 검색어가 필요합니다." });
// //     }

// //     if (isbn) {
// //       naverApiUrl = `${naverApiBaseUrl}?query=${isbn}`;
// //       aladinApiUrl = `${aladinApiLookUpUrl}?ttbkey=${aladinApiKey}&itemIdType=ISBN&ItemId=${isbn}&output=js&Cover=Big&Version=20131101&CategoryId`;
// //     } else {
// //       naverApiUrl = `${naverApiBaseUrl}?query=${encodeURIComponent(
// //         searchQuery
// //       )}`;
// //       aladinApiUrl = `${aladinApiSearchUrl}?ttbkey=${aladinApiKey}&Query=${encodeURIComponent(
// //         searchQuery
// //       )}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101&CategoryId`;
// //     }

// //     const naverHeaders = {
// //       "X-Naver-Client-Id": naverClientId,
// //       "X-Naver-Client-Secret": naverClientSecret,
// //     };

// //     const [naverData, aladinData] = await Promise.all([
// //       fetchData(naverApiUrl, naverHeaders),
// //       fetchData(aladinApiUrl),
// //     ]);

// //     res.json({ naverData, aladinData });
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Listening on port ${port}...`);
// // });
