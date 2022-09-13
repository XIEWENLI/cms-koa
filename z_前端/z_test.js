const fileEL = document.querySelector("#file");
const divEL = document.querySelector("div");
const progressEL = document.querySelector("progress");

// 功能：同步获取hash值、切片上传、精度条
divEL.addEventListener("click", () => {
  fileEL.click();
});

fileEL.addEventListener("change", () => {
  const fileInfos = Array.from(fileEL.files);
  let progressVal = 0;

  progressEL.style.display = "block";

  fileInfos.forEach((fileInfo) => {
    const suffix = fileInfo.type.split("/")[1];
    const type = fileInfo.type;

    console.log("1、文件读取~");
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(fileInfo);

    fileReader.onload = async (e) => {
      console.log("2、获取hash值~");
      const hash = getHash(e.target.result);

      console.log("3、开始切片~");
      let size = 50 * 1024; // 切片大小
      if (fileInfo.size / size > 100) {
        size = Math.ceil(fileInfo.size / 100);
      }

      let fileChunks = [];
      let index = 0; //切片序号
      for (let cur = 0; cur < fileInfo.size; cur += size) {
        fileChunks.push({
          hash: `${hash}_${index}`,
          chunk: fileInfo.slice(cur, cur + size),
        });
        index++;
      }

      // 获取已上传切片数组（断点续传）
      try {
        const { data: fileSliceArr } = await axios.get(
          "http://127.0.0.1:8000/file/getFileSlice",
          {
            params: {
              hash,
            },
          }
        );

        // 排除已经上传的（断点续传）
        fileChunks = fileChunks.filter((item) => {
          return !fileSliceArr.includes(item.hash);
        });
      } catch (err) {
        console.log("获取已上传切片失败的原因：" + err.response.data);
      }

      // 遍历上传每一片
      console.log("4、上传切片~");
      let formData = new FormData();
      let promiseArr = [];

      // 进度条-一个或多个文件时赋不同的max值
      if (fileInfos.length === 1) {
        progressEL.max = fileChunks.length;
      } else {
        progressEL.max = fileInfos.length;
      }

      console.log(fileChunks);

      fileChunks.forEach((fileChunk, i) => {
        formData.append("file", fileChunk.chunk);
        formData.append("hash", fileChunk.hash);
        formData.append("suffix", suffix);
        promiseArr.push(
          axios
            .post("http://127.0.0.1:8000/file/uploadFileSlice", formData)
            .then((res) => {
              // 进度条-控制一个文件时
              if (fileInfos.length === 1) {
                progressVal += 1;
                progressEL.value = progressVal;
              }
            })
            .catch((err) => {
              console.log("切片上传失败的原因：" + err.response.data);
            })
        );
      });

      Promise.all(promiseArr)
        .then((res) => {
          // 进度条-一个或多个文件时
          if (fileInfos.length > 1) {
            progressVal += 1;
            progressEL.value = progressVal;
          }

          if (progressEL.value === progressEL.max || fileChunks.length === 0) {
            console.log("5、上传切片成功~");
            progressEL.value = 0;
            progressEL.max = 100;
            progressEL.style.display = "none";
          }

          // 合并切片
          axios
            .get("http://127.0.0.1:8000/file/mergeFile", {
              params: {
                hash,
                suffix,
                type,
                len: index,
              },
            })
            .then((res) => {
              console.log(res.data.file);
            })
            .catch((err) => {
              console.log("合并切片失败的原因：" + err.response.data);
            });
        })
        .catch((err) => {
          console.log("上传失败~");
          console.log(err);
        });
    };
  });
});

function getHash(file) {
  const spart = new SparkMD5.ArrayBuffer();
  spart.append(file);
  const hash = spart.end();

  return hash;
}
