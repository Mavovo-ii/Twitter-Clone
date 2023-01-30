import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'



document.addEventListener('click', function (event) {
    if (event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like)
    } else if (event.target.dataset.retweets) {
        handleRetweetClick(event.target.dataset.retweets)
    } else if (event.target.dataset.reply) {
        handleReplyClick(event.target.dataset.reply)
    } else if (event.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
})


function handleLikeClick(tweetID) {

    const targetTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetID
    })[0]

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--
    }
    else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    render()
}


function handleRetweetClick(tweetID) {
    const targetRetweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetID
    })[0]

    if (targetRetweetObj.isRetweeted) {
        targetRetweetObj.retweets--
    } else {
        targetRetweetObj.retweets++
    }
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted

    render()
}


function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden")
}

function handleTweetBtnClick() {

    const tweetInput = document.getElementById('tweet-input')

    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })

        render()
        tweetInput.value = ""
    }
}



function getFeedHtml() {
    let feedHtml = ""

    tweetsData.forEach(tweet => {

        let likeIconColorChange = ""

        if (tweet.isLiked) {
            likeIconColorChange = "liked"
        }

        let retweetIconColorChange = ""

        if (tweet.isRetweeted) {
            retweetIconColorChange = "retweeted"
        }

        let repliesHtml = ""

        if (tweet.replies.length > 0) {
            tweet.replies.forEach(function (reply) {
                repliesHtml += `
                   <div class="tweet-reply">
                       <div class="tweet-inner">
                           <img src="${reply.profilePic}" class="profile-pic">
                           <div>
                              <p class="handle">${reply.handle}</p>
                              <p class="tweet-text">${reply.tweetText}</p>
                           </div>
                       </div>
                   </div>
                `
            })
        }

        feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src=${tweet.profilePic} class="profile-pic"/>
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">

                    <span class="tweet-detail">
                       <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                       ${tweet.replies.length}
                    </span>

                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart" id="${likeIconColorChange}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>

                    <span class="tweet-detail">
                        <i class="fa-regular fa-retweet" id="${retweetIconColorChange}"  data-retweets="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class="hidden" id="replies-${tweet.uuid}">
           ${repliesHtml}
        </div>
    </div>
    `
    })

    return feedHtml

}


function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()




// {/* <div class="tweet">
//     <div class="tweet-inner">
//         <img src="URL OF PROFILE PIC" class="profile-pic"/>
//         <div>
//             <p class="handle">TWEET HANDLE</p>
//             <p class="tweet-text">TWEET TEXT</p>
//             <div class="tweet-details">
//                 <span class="tweet-detail">
//                     NUMBER OF REPLIES
//                 </span>
//                 <span class="tweet-detail">
//                     NUMBER OF LIKES
//                 </span>
//                 <span class="tweet-detail">
//                     NUMBER OF RETWEETS
//                 </span>
//             </div>   
//         </div>            
//     </div>
// </div> */}



