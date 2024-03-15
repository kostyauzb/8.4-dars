import { useState, useRef } from "react";

function App() {
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const userRef = useRef();
  const [gitData, setGitData] = useState(null);

  const joinedDate = gitData && gitData.created;
  const formattedDate = new Date(joinedDate);

  const month = formattedDate.toLocaleDateString("en-US", { month: "short" });
  const day = formattedDate.getDate();
  const year = formattedDate.getFullYear();

  const handleForm = async (e) => {
    e.preventDefault();
    const userName = userRef.current.value;

    try {
      setIsPending(true);
      const response = await fetch(`https://api.github.com/users/${userName}`);
      setError(response.status);
      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();

      setGitData({
        avatar: data.avatar_url,
        name: data.name,
        created: data.created_at,
        login: data.login,
        bio: data.bio,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        location: data.location,
        twitter: data.twitter_username,
        blog: data.blog,
        company: data.company,
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-container">
      <header className="flex items-center">
        <a href="/" className="text-[#222731] text-[26px] font-bold ">
          devfinder
        </a>
        <a
          target="_blank"
          href="https://t.me/qosimjon_1"
          className="text-[#697C9A] text-[13px] font-bold ml-auto flex items-center"
        >
          Contact{" "}
          <svg
            className="opacity-60 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
          </svg>
        </a>
      </header>

      <div className="card bg-base-100 shadow-lg mt-8 h-[69px] justify-center">
        <div className="card-body py-4 justify-center pr-3 max-[382px]:pl-4">
          <div className="flex items-center">
            <svg
              className="max-[484px]:w-[20px] max-[484px]:h-[20px]"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6087 0C4.7591 0 0 4.74609 0 10.5797C0 16.4133 4.75915 21.1594 10.6087 21.1594C13.2162 21.1594 15.6071 20.2163 17.4563 18.6542L22.575 23.747C22.7449 23.9157 22.9664 24 23.1884 24C23.4118 24 23.635 23.9145 23.8049 23.7438C24.1435 23.4032 24.142 22.8527 23.8017 22.5139L18.6893 17.4274C20.2652 15.5807 21.2174 13.189 21.2174 10.5797C21.2174 4.74609 16.4582 0 10.6087 0ZM16.9346 16.7705C18.5071 15.1744 19.4782 12.9879 19.4782 10.5797C19.4782 5.70488 15.4994 1.73908 10.6087 1.73908C5.71794 1.73908 1.73913 5.70488 1.73913 10.5797C1.73913 15.4542 5.71794 19.4203 10.6087 19.4203C13.0163 19.4203 15.2029 18.4591 16.8027 16.9016C16.8211 16.879 16.8407 16.8571 16.8617 16.836C16.885 16.8125 16.9094 16.7907 16.9346 16.7705Z"
                fill="#0079FF"
              />
            </svg>
            <form onSubmit={handleForm} className="ml-6 text-base font-mono">
              <input
                ref={userRef}
                className="input input-bordered w-[300px] max-[585px]:w-[250px] max-[538px]:w-[200px] max-[538px]:text-[14px] max-[484px]:w-[160px] max-[484px]:text-[12px]"
                required
                type="text"
                placeholder="Search username..."
              />
            </form>
            {error && error === 404 && (
              <h1
                className={`text-[#F74646] text-[15px] font-bold max-[705px]:hidden ${
                  isPending ? "hidden" : null
                } ml-auto`}
              >
                No results
              </h1>
            )}

            <button
              onClick={handleForm}
              className="btn btn-info w-[106px] text-white font-bold text-[15px] font-mono h-[50px] ml-auto max-[705px]:w-[80px]"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="flex justify-center mt-8">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}

      {!gitData && !error && (
        <div
          className={`text-[30px] font-mono font-bold flex justify-center mt-10 max-[700px]:text-[20px] max-[505px]:text-[15px] ${
            isPending ? "hidden" : null
          } `}
        >
          Please search for user on github
        </div>
      )}

      {error && error === 404 ? (
        <div
          className={`text-[#F74646] text-[15px] invisible font-bold justify-center w-max mx-auto mt-[50px] ml-auto max-[704px]:visible ${
            isPending ? "hidden" : null
          } `}
        >
          No resultss
        </div>
      ) : (
        gitData && (
          <div
            className={`card lg:card-side bg-base-100 shadow-xl mt-6 ${
              isPending ? "hidden" : null
            }`}
          >
            <div className="card-body h-auto max-[466px]:p-[20px]">
              <div className="flex">
                <div className="flex">
                  <img
                    className="w-[117px] h-[117px] rounded-full max-[730px]:w-[100px] max-[730px]:h-[100px] max-[466px]:w-[80px] max-[466px]:h-[80px]"
                    src={
                      gitData
                        ? gitData.avatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDFdc9C7IpQjwS-KdXVu52w0-pfP6ZxPp_zArntgudznX0LOo9smqwC0rFIru1OpsHMg&usqp=CAU"
                    }
                    alt=""
                  />
                </div>
                <div className="ml-[41px]">
                  <div className="grid grid-cols-2 items-center max-[730px]:block">
                    <p className="text-[#2B3442] text-[26px] font-bold max-[466px]:text-[16px]">
                      {gitData && gitData.name ? gitData.name : "Not Available"}
                    </p>
                    <p className="text-[#697C9A] font-normal text-[15px] font-mono ml-10 max-[730px]:ml-0 max-[466px]:text-[13px]">
                      {gitData
                        ? "Joined" + " " + `${day + " " + month + " " + year}`
                        : "Not Available"}
                    </p>
                  </div>
                  <p className="text-[#0079FF] text-[16px] font-normal mt-[2px]">
                    {gitData && gitData.login
                      ? "@" + gitData.login
                      : "Not Available"}
                  </p>
                  <p className="text-[#4B6A9B] max-w-[400px] mt-5 text-[15px] font-normal max-[730px]:mt-[34px] max-[730px]:ml-[-135px] max-[466px]:ml-[-95px]">
                    {gitData && gitData.bio
                      ? gitData.bio
                      : "This profile has no bio"}
                  </p>
                </div>
              </div>
              <div className="bg-[#F6F8FF] h-[85px] w-[510px] ml-auto rounded-[10px] grid grid-cols-3 max-[730px]:w-full max-[466px]-h-[85px] max-[780px]:w-[480px]">
                <div className="ml-8 m-4 max-[466px]:m-[18px] max-[466px]:grid max-[466px]:self-center max-[466px]:justify-items-center">
                  <p className="text-[#4B6A9B] text-[13px] font-normal max-[466px]:text-[11px]">
                    Repos
                  </p>
                  <p className="text-[#2B3442] text-[22px] font-bold max-[466px]:text-[16px]">
                    {gitData ? gitData.repos : 0}
                  </p>
                </div>
                <div className="ml-8 m-4 max-[466px]:m-[18px] max-[466px]:grid max-[466px]:self-center max-[466px]:justify-items-center">
                  <p className="text-[#4B6A9B] text-[13px] font-normal max-[466px]:text-[11px]">
                    Followers
                  </p>
                  <p className="text-[#2B3442] text-[22px] font-bold max-[466px]:text-[16px]">
                    {gitData ? gitData.followers : 0}
                  </p>
                </div>
                <div className="ml-8 m-4 max-[466px]:m-[18px] max-[466px]:grid max-[466px]:self-center max-[466px]:justify-items-center">
                  <p className="text-[#4B6A9B] text-[13px] font-normal max-[466px]:text-[11px]">
                    Following
                  </p>
                  <p className="text-[#2B3442] text-[22px] font-bold max-[466px]:text-[16px]">
                    {gitData ? gitData.following : 0}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-7 mt-9 ml-[160px] max-[730px]:w-full max-[730px]:m-0 max-[730px]:mt-3 max-[730px]:grid-cols-1">
                <div
                  className={`flex items-center ${
                    gitData && gitData.location ? null : "opacity-50"
                  }`}
                >
                  <svg
                    width="14"
                    height="20"
                    viewBox="0 0 14 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.03013 0.00158203C9.42758 0.0504882 11.5835 1.33021 12.7973 3.4249C14.038 5.56599 14.072 8.13786 12.8882 10.3047L7.92872 19.3823L7.92196 19.3943C7.7038 19.7736 7.3129 20 6.87634 20C6.43974 20 6.04884 19.7736 5.83064 19.3943L5.82388 19.3823L0.86439 10.3047C-0.319437 8.13786 -0.285492 5.56599 0.95521 3.4249C2.16904 1.33021 4.32497 0.0504882 6.72239 0.00158203C6.82477 -0.000527343 6.92778 -0.000527343 7.03013 0.00158203ZM4.06376 6.25001C4.06376 7.80083 5.32544 9.06251 6.87626 9.06251C8.42712 9.06251 9.68876 7.80083 9.68876 6.25001C9.68876 4.69919 8.42708 3.43752 6.87626 3.43752C5.32544 3.43752 4.06376 4.69919 4.06376 6.25001Z"
                      fill="#4B6A9B"
                    />
                  </svg>
                  <p className="text-[#4B6A9B] text-[15px] font-normal font-mono ml-[19px] max-[466px]:text-[13px]">
                    {gitData && gitData.location
                      ? gitData.location
                      : "Not Available"}
                  </p>
                </div>
                <div
                  className={`flex items-center ${
                    gitData && gitData.twitter ? null : "opacity-50"
                  }`}
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 2.79876C19.2562 3.12501 18.4637 3.34126 17.6375 3.44626C18.4875 2.93876 19.1362 2.14126 19.4412 1.18001C18.6487 1.65251 17.7737 1.98626 16.8412 2.17251C16.0887 1.37126 15.0162 0.875015 13.8462 0.875015C11.5762 0.875015 9.74874 2.71751 9.74874 4.97626C9.74874 5.30126 9.77624 5.61376 9.84374 5.91126C6.43499 5.74501 3.41875 4.11126 1.3925 1.62251C1.03875 2.23626 0.831249 2.93876 0.831249 3.69501C0.831249 5.11501 1.5625 6.37376 2.6525 7.10251C1.99375 7.09001 1.3475 6.89876 0.799999 6.59751C0.799999 6.61001 0.799999 6.62626 0.799999 6.64251C0.799999 8.63501 2.22125 10.29 4.085 10.6713C3.75125 10.7625 3.3875 10.8063 3.01 10.8063C2.7475 10.8063 2.4825 10.7913 2.23375 10.7363C2.765 12.36 4.2725 13.5538 6.06499 13.5925C4.67 14.6838 2.89875 15.3413 0.981249 15.3413C0.644999 15.3413 0.3225 15.3263 0 15.285C1.81625 16.4562 3.96875 17.125 6.28999 17.125C13.835 17.125 17.96 10.875 17.96 5.45751C17.96 5.27626 17.9537 5.10126 17.945 4.92751C18.7587 4.35001 19.4425 3.62876 20 2.79876Z"
                      fill="#4B6A9B"
                    />
                  </svg>
                  <a
                    target="_blank"
                    href={
                      gitData &&
                      gitData.twitter &&
                      `https://twitter.com/${gitData.twitter}`
                    }
                    className={
                      "text-[#4B6A9B] text-[15px] font-normal font-mono ml-[19px] max-[466px]:text-[13px] "
                    }
                  >
                    {gitData && gitData.twitter
                      ? gitData.twitter
                      : "Not Available"}
                  </a>
                </div>
                <div
                  className={`flex items-center ${
                    gitData && gitData.blog ? null : "opacity-50"
                  }`}
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.40416 5.01207C5.04862 7.44921 5.56264 11.4937 8.26088 13.2854C8.34979 13.3445 8.46807 13.3328 8.54444 13.2582C9.11248 12.7031 9.59303 12.1655 10.0138 11.4817C10.0782 11.3771 10.0381 11.2414 9.93014 11.1829C9.51858 10.9599 9.10905 10.5418 8.8785 10.1002L8.87823 10.1003C8.60205 9.55042 8.50803 8.93398 8.65424 8.29734C8.6544 8.29738 8.65455 8.29742 8.65471 8.29742C8.82295 7.48234 9.69799 6.72414 10.3663 6.02293C10.3649 6.02246 10.3635 6.02195 10.3621 6.02148L12.8662 3.46578C13.864 2.44731 15.5054 2.43891 16.5137 3.44715C17.5321 4.445 17.549 6.09468 16.5511 7.11312L15.0344 8.67281C14.9642 8.74499 14.9414 8.85031 14.9743 8.9455C15.3235 9.9582 15.4094 11.3861 15.1754 12.465C15.1688 12.4951 15.2061 12.5149 15.2277 12.4928L18.4557 9.19816C20.5179 7.09347 20.5004 3.66676 18.4168 1.58324C16.2906 -0.543044 12.829 -0.525348 10.7246 1.6225L7.41709 4.99824C7.41272 5.00285 7.40858 5.00754 7.40416 5.01207Z"
                      fill="#4B6A9B"
                    />
                    <path
                      d="M13.439 13.7495C13.4389 13.7496 13.4388 13.7498 13.4388 13.7499C13.4409 13.749 13.4428 13.7482 13.4449 13.7473C14.1036 12.5426 14.2333 11.161 13.9246 9.81421L13.9232 9.81565L13.9217 9.81499C13.6285 8.61542 12.8241 7.42425 11.7316 6.69085C11.6376 6.62777 11.4875 6.63507 11.3995 6.70624C10.8461 7.1537 10.3044 7.72749 9.94697 8.45972C9.89083 8.57468 9.93287 8.71276 10.0435 8.77698C10.4583 9.0178 10.8329 9.37038 11.0837 9.83847L11.0841 9.83819C11.2796 10.1689 11.4722 10.7963 11.3474 11.4704C11.3474 11.4704 11.3472 11.4704 11.3472 11.4704C11.2308 12.3642 10.3282 13.184 9.61068 13.9228L9.61103 13.9232C9.06486 14.4817 7.67646 15.8971 7.12052 16.465C6.12267 17.4835 4.47299 17.5003 3.45455 16.5024C2.43612 15.5046 2.41928 13.8549 3.41713 12.8365L4.93834 11.2721C5.00728 11.2012 5.03072 11.0982 5.00006 11.0041C4.66228 9.96776 4.56975 8.57202 4.78295 7.49441C4.78889 7.46437 4.75193 7.44519 4.73049 7.46706L1.551 10.7122C-0.53228 12.8385 -0.514624 16.3003 1.5903 18.4052C3.71647 20.4884 7.16049 20.4532 9.24369 18.3271C9.9674 17.5175 13.0654 14.6492 13.439 13.7495Z"
                      fill="#4B6A9B"
                    />
                  </svg>
                  <a
                    target="_blank"
                    href={gitData && gitData.blog ? gitData.blog : null}
                    className={`text-[#4B6A9B] text-[15px] font-normal ml-[19px] font-mono max-[466px]:text-[13px]`}
                  >
                    {gitData && gitData.blog ? "Blog site" : "Not Available"}
                  </a>
                </div>
                <div
                  className={`flex items-center ${
                    gitData && gitData.company ? null : "opacity-50"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.8583 1.55835L1.7 0.166681C1.275 0.100014 0.841666 0.216681 0.516666 0.491681C0.191666 0.775014 0 1.18335 0 1.60835V19.1667C0 19.625 0.375 20 0.833333 20H3.54166V15.625C3.54166 14.8167 4.19166 14.1667 5 14.1667H7.08333C7.89166 14.1667 8.54166 14.8167 8.54166 15.625V20H12.0833V3.00001C12.0833 2.28335 11.5667 1.67501 10.8583 1.55835ZM4.58333 12.2917H3.33333C2.98833 12.2917 2.70833 12.0117 2.70833 11.6667C2.70833 11.3217 2.98833 11.0417 3.33333 11.0417H4.58333C4.92833 11.0417 5.20833 11.3217 5.20833 11.6667C5.20833 12.0117 4.92833 12.2917 4.58333 12.2917ZM3.33333 9.79167H4.58333C4.92833 9.79167 5.20833 9.51167 5.20833 9.16667C5.20833 8.82167 4.92833 8.54167 4.58333 8.54167H3.33333C2.98833 8.54167 2.70833 8.82167 2.70833 9.16667C2.70833 9.51167 2.98833 9.79167 3.33333 9.79167ZM4.58333 7.29167H3.33333C2.98833 7.29167 2.70833 7.01167 2.70833 6.66667C2.70833 6.32167 2.98833 6.04168 3.33333 6.04168H4.58333C4.92833 6.04168 5.20833 6.32167 5.20833 6.66667C5.20833 7.01167 4.92833 7.29167 4.58333 7.29167ZM3.33333 4.79168H4.58333C4.92833 4.79168 5.20833 4.51168 5.20833 4.16668C5.20833 3.82168 4.92833 3.54168 4.58333 3.54168H3.33333C2.98833 3.54168 2.70833 3.82168 2.70833 4.16668C2.70833 4.51168 2.98833 4.79168 3.33333 4.79168ZM8.74999 12.2917H7.49999C7.15499 12.2917 6.87499 12.0117 6.87499 11.6667C6.87499 11.3217 7.15499 11.0417 7.49999 11.0417H8.74999C9.09499 11.0417 9.37499 11.3217 9.37499 11.6667C9.37499 12.0117 9.09499 12.2917 8.74999 12.2917ZM7.49999 9.79167H8.74999C9.09499 9.79167 9.37499 9.51167 9.37499 9.16667C9.37499 8.82167 9.09499 8.54167 8.74999 8.54167H7.49999C7.15499 8.54167 6.87499 8.82167 6.87499 9.16667C6.87499 9.51167 7.15499 9.79167 7.49999 9.79167ZM8.74999 7.29167H7.49999C7.15499 7.29167 6.87499 7.01167 6.87499 6.66667C6.87499 6.32167 7.15499 6.04168 7.49999 6.04168H8.74999C9.09499 6.04168 9.37499 6.32167 9.37499 6.66667C9.37499 7.01167 9.09499 7.29167 8.74999 7.29167ZM7.49999 4.79168H8.74999C9.09499 4.79168 9.37499 4.51168 9.37499 4.16668C9.37499 3.82168 9.09499 3.54168 8.74999 3.54168H7.49999C7.15499 3.54168 6.87499 3.82168 6.87499 4.16668C6.87499 4.51168 7.15499 4.79168 7.49999 4.79168Z"
                      fill="#4B6A9B"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9166 7.79251L18.85 9.03501C19.5308 9.18584 20 9.77168 20 10.46V18.5417C20 19.3458 19.3458 20 18.5416 20H12.9166V7.79251ZM15.625 17.5H16.875C17.22 17.5 17.5 17.22 17.5 16.875C17.5 16.53 17.22 16.25 16.875 16.25H15.625C15.28 16.25 15 16.53 15 16.875C15 17.22 15.28 17.5 15.625 17.5ZM16.875 15H15.625C15.28 15 15 14.72 15 14.375C15 14.03 15.28 13.75 15.625 13.75H16.875C17.22 13.75 17.5 14.03 17.5 14.375C17.5 14.72 17.22 15 16.875 15ZM15.625 12.5H16.875C17.22 12.5 17.5 12.22 17.5 11.875C17.5 11.53 17.22 11.25 16.875 11.25H15.625C15.28 11.25 15 11.53 15 11.875C15 12.22 15.28 12.5 15.625 12.5Z"
                      fill="#4B6A9B"
                    />
                  </svg>
                  <p className="text-[#4B6A9B] text-[15px] font-normal ml-[19px] max-[466px]:text-[13px]">
                    {gitData && gitData.company
                      ? gitData.company
                      : "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
