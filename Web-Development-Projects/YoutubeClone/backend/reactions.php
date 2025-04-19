<?php
class Reactions
{
    static function setReaction($postArray, $videoId) {
        global $con;
        $array = [];
        if (!empty($postArray)) {

            if (isset($postArray['name']) && $postArray['name'] != '') {
                $name = stripslashes(trim($postArray['name']));
            } else {
                $array['error'][] = "Name not set in array";
            }
            if (isset($postArray['email']) && filter_var($postArray['email'], FILTER_VALIDATE_EMAIL)) {
                $email = stripslashes(trim($postArray['email']));
            } else {
                $array['error'][] = "Invalid email format";
            }

            if (isset($postArray['message']) && $postArray['message'] != '') {
                $message = stripslashes(trim($postArray['message']));
            } else {
                $array['error'][] = "Message not set in array";
            }

            if (empty($array['error'])) {
                $srqry = $con->prepare("INSERT INTO reactions (video_id, name, email, message) VALUES (?, ?, ?, ?);");
                if ($srqry === false) {
                    prettyDump(mysqli_error($con));
                }

                $srqry->bind_param('isss', $videoId, $name, $email, $message);
                if ($srqry->execute() === false) {
                    prettyDump(mysqli_error($con));
                } else {
                    $array['success'] = "Reaction saved successfully";
                }

                $srqry->close();
            }

            return $array;
        }
    }

    static function getReactions($videoId) {
        global $con;
        $array = [];
        $grqry = $con->prepare("SELECT id, name, email, message FROM reactions WHERE video_id = ?;");
        if ($grqry === false) {
            prettyDump(mysqli_error($con));
        } else {
            $grqry->bind_param('i', $videoId);
            $grqry->bind_result($id, $name, $email, $message);
            if ($grqry->execute()) {
                $grqry->store_result();
                while ($grqry->fetch()) {
                    $array[] = [
                        'id' => $id,
                        'name' => $name,
                        'email' => $email,
                        'message' => $message
                    ];
                }
            }
            $grqry->close();
        }
        return $array;
    }
}