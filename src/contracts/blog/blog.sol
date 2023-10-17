// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Blog {
    struct Post {
        uint id;
        string title;
        string content;
        address author;
        uint timestamp;
        uint[] comments;
        bool isDeleted;
        uint likes;
    }

    struct Comment {
        uint id;
        string content;
        address author;
        uint timestamp;
    }

    event PostCreated(Post post);
    event CommentCreated(Comment comment);
    event PostDeleted(Post post);

    Post[] public posts;
    Comment[] public comments;

    function createPost(string memory _title, string memory _content) public {
        uint[] memory emptyComments;
        posts.push(
            Post(
                posts.length,
                _title,
                _content,
                msg.sender,
                block.timestamp,
                emptyComments,
                false,
                0
            )
        );
        emit PostCreated(posts[posts.length - 1]);
    }

    function getPost(
        uint _id
    )
        public
        view
        returns (
            uint,
            string memory,
            string memory,
            address,
            uint,
            uint[] memory,
            uint
        )
    {
        Post memory post = posts[_id];
        if (post.isDeleted) {
            return (0, "", "", address(0), 0, new uint[](0), 0);
        }
        return (
            post.id,
            post.title,
            post.content,
            post.author,
            post.timestamp,
            post.comments,
            post.likes
        );
    }

    function getNumPosts() public view returns (uint) {
        uint unDeletedPostsCount;
        for (uint i = 0; i < posts.length; i++) {
            if (!posts[i].isDeleted) {
                unDeletedPostsCount++;
            }
        }
        return unDeletedPostsCount;
    }

    function createComment(uint _postId, string memory _content) public {
        comments.push(
            Comment(comments.length, _content, msg.sender, block.timestamp)
        );
        uint commentId = comments.length - 1;
        posts[_postId].comments.push(commentId);
        emit CommentCreated(comments[commentId]);
    }

    function getComment(
        uint _id
    ) public view returns (uint, string memory, address, uint) {
        Comment memory comment = comments[_id];
        return (comment.id, comment.content, comment.author, comment.timestamp);
    }

    function getNumComments() public view returns (uint) {
        return comments.length;
    }

    function deletePost(uint _id) public returns (bool) {
        if (_id > posts.length || posts[_id].author != msg.sender) {
            return false;
        }
        posts[_id].isDeleted = true;
        emit PostDeleted(posts[_id]);
        return true;
    }

    function getAllPosts() public view returns (Post[] memory) {
        uint unDeletedPostsCount;
        for (uint i = 0; i < posts.length; i++) {
            if (!posts[i].isDeleted) {
                unDeletedPostsCount++;
            }
        }
        Post[] memory unDeletedPosts = new Post[](unDeletedPostsCount);
        for (uint i = 0; i < posts.length; i++) {
            if (!posts[i].isDeleted) {
                unDeletedPosts[unDeletedPostsCount - 1] = posts[i];
                unDeletedPostsCount--;
            }
        }
        return unDeletedPosts;
    }

    function getMyPosts(address _author) public view returns (Post[] memory) {
        uint myPostsCount = 0;

        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].author == _author) {
                myPostsCount++;
            }
        }

        Post[] memory myPosts = new Post[](myPostsCount);

        myPostsCount = 0;

        for (uint i = 0; i < posts.length; i++) {
            if (posts[i].author == _author) {
                myPosts[myPostsCount] = posts[i];
                myPostsCount++;
            }
        }

        return myPosts;
    }
}
