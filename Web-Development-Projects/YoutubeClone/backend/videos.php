<?php
class Videos
{
    static function setVideo($postArray){
        global $con;
        $array = [];
        if (!empty($postArray)) {

            if (isset($postArray['title']) && $postArray['title'] != '') {
                $title = stripslashes(trim($postArray['title']));
            }else{
                $array['error'][] = "title not set in array";
            }
            if (isset($postArray['description']) && filter_var($postArray['description'] != '')) {
                $description = stripslashes(trim($postArray['description']));
            }else{
                $array['description'][] = '';
            }

            if (isset($postArray['url']) && $postArray['url'] != '') {
                $url = stripslashes(trim($postArray['url']));
            }else{
                $array['error'][] = "url not set in array";
            }

            if (empty($array['error'])) {

                $svqry = $con->prepare("INSERT INTO videos (title,description,url) VALUES (?,?,?);");
                if ($svqry === false) {
                    prettyDump( mysqli_error($con) );
                }
                
                $svqry->bind_param('sss',$title,$description,$url);
                if ($svqry->execute() === false) {
                    prettyDump( mysqli_error($con) );
                }else{
                    $array['succes'] = "Video posted succesfully";
                }
            
                $svqry->close();
            }
            return $array;
        }
    }
    
    static function getVideos(){
        global $con;
        $array = [];
        $gvqry = $con->prepare("SELECT id,title,description,url FROM videos;");
        if($gvqry === false) {
            prettyDump( mysqli_error($con) );
        } else{
            $gvqry->bind_result($id,$title,$description,$url);
            if($gvqry->execute()){
                $gvqry->store_result();
                while($gvqry->fetch()){
                    $array[] = [
                        'id' => $id,
                        'title' => $title,
                        'description'=> $description,
                        'url' => $url
                    ];
                }
            }
            $gvqry->close();
        }
        return $array;
    }
}