from com.atlassian.jira.component import ComponentAccessor

_jira_base_url = ComponentAccessor().getApplicationProperties().getString("jira.baseurl")

def get_request_details(jira_issue = issue):
    import urllib2
    url = "%s/rest/servicedeskapi/request/%s" % (_jira_base_url, jira_issue.getKey())
    req = urllib2.Request(url)
    req.add_header("Authorization", "Basic *") 
    try:
        response = urllib2.urlopen(req)
        result = response.read()
    except:
        return jira_issue.getDescription()
    
    def value_is_user(value):
        try:
            return True if (value["self"] and value["name"] and value["key"] and value["emailAddress"] and value["displayName"]) else False
        except:
            return False

    def value_is_users(value):
        try:
            iter(value)
            return value_is_user(value[0])
        except:
            return False

    def value_is_attachments(value):
        try:
            iter(value)
            return True if (value[0]["self"] and value[0]["id"] and value[0]["filename"] and value[0]["created"] and value[0]["size"]) else False
        except:
            return False

    def value_is_select(value):
        try:
            return True if (value["self"] and value["value"] and value["id"]) else False
        except:
            return False

    def value_is_unknown(value):
        try:
            return False if value[0] == str(value[0]) else True
        except:
            return False if value == str(value) else True

    def value_is_array(value):
        return True if type(value) == type([]) else False

    def get_new_dict(array):
        new_dict = {}
        for dictionary in array:
            try:
                value = dictionary["value"]
                label = dictionary["label"]
                if value_is_user(value):
                    new_dict[label] = value["displayName"]
                elif value_is_users(value):
                    new_dict[label] = ", ".join([user["displayName"] for user in value])
                elif value_is_attachments(value):
                    new_dict[label] = ", ".join([file["filename"] for file in value])
                elif value_is_select(value):
                    new_dict[label] = value["value"]
                elif value_is_unknown(value):
                    if value:
                        new_dict[label] = "Указано в запросе"
                elif value_is_array(value):
                    new_dict[label] = ", ".join([unicode(item) for item in value])
                else:
                    new_dict[label] = value
            except:
                pass
        return new_dict

    def dict_as_description(dictionary):
        return u"\n".join([u"%s: %s" % (key, dictionary[key]) for key in dictionary])

    true = True; false = False; exec("requestFieldValues = "+result+"['requestFieldValues']") in globals(), locals()
    return dict_as_description(get_new_dict(requestFieldValues))

issue.setDescription(get_request_details(issue))
