
def GetBaseURL():
 
    path = "http://139.59.78.54:5001"
    return path

def getwebBaseurl():
 
    path = "https://fandomlive.fourbrick.in"
    return path

def GetdefaultNotificationImage():
 
    path = "/notificationimages/default.jpg"
    return path

def GetdefaultNewsImage():
 
    path = "/newsimages/default.jpg"
    return path

def Getdefaultimage():
 
    path = "/CampImages/default.jpg"
    return path

def GetRewardDefaultimage():
 
    path = "/RewardImage/default.jpg"
    return path

def GetSecurityDefaultimage():
 
    path = "/SecurityImage/default.jpg"
    return path

def GetSecurityDocumentPath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/SecurityDocuments/"+filename
    return path

#folder path to save image
def GetCampaignImagePath(filename):

    path = "/var/www/Healthmonitor/images/"+filename
    return path

def getforumCommentImagePath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/forumCommentImage/"+filename
    return path

def getforumCommentReplyImagePath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/forumCommentReplyImage/"+filename
    return path


#folder path to save image
def GetrewardCampaignImagePath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/RewardImage/"+filename
    return path

def getSecurityCampaignUpdatePath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/securityCampaignUpdate/"+filename
    return path

def getNotificationPath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/notificationimages/"+filename
    return path

def getNewsPath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/newsimages/"+filename
    return path

def GetsecurityCampaignImagePath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/SecurityImage/"+filename
    return path
    
def GetProfilePicPath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/ProfilePic/"+filename
    return path

def GetTeamPicPath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/TeamLogo/"+filename
    return path

def GetArtistPicPath(filename):

    path = "/var/www/FandomLive/backend/FandomLive/Api/ArtistImage/"+filename
    return path
    
def GetDeviceTypeId(DeviceType):
 
    values = {
        "MOBILE" :1,
        "DESKTOP" :2,
        "TAB" :3,
        "IPHONE" :4,
        "OTHER" :5
    }
    return values.get(DeviceType, 4)

def artistType(id):
 
    values = {
        "1" :"Singer",
        "2" :"Dance",
        "3" :"Speech",
        "4" :"other"
    }
    return values.get(id, 4)

def GetGender(Gender):
    values = {
        "MALE" :1,
        "FEMALE" :2,
        "OTHER" :3
    }
    return values.get(Gender, Gender)
    
def GetSocialMediaId(SocialMediaName):
    values = {
        "GMAIL" :1,
        "FACEBOOK" :2,
        "INSTAGRAM" :3,
        "EMAIL" :4,
        "OTHER":5
    }
    return values.get(SocialMediaName,5)
