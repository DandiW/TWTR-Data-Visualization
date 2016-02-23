#twtr

**Development Guide:**

1. Install Pip. You'll need this if you ever use Python. https://pip.pypa.io/en/stable/installing/
2. Run pip install -r requirements.txt
3. Run python runserver.py
4. Navigate to http://127.0.0.1:9001/

Everything else should get setup automatically!

API Guide:
```
/api/cities
``` 
gives a list of available cities. 

```
/api/city/<name>
```
gives a list of trends in a city
So 
```
/api/city/chicago
``` 
will give back something like 
```
[  
   {  
      "trends":[  
         {  
            "name":"#NationalMargaritaDay",
            "url":"http:\/\/twitter.com\/search?q=%23NationalMargaritaDay",
            "promoted_content":null,
            "query":"%23NationalMargaritaDay",
            "tweet_volume":63383
            }
    	]
    }
]
```

Once you have that, you can then hit the endpoint
```
/api/city/chicago/%23NationalMargaritaDay/:)
```
to see happy tweets or
```
/api/city/chicago/%23NationalMargaritaDay/:(
```
to see sad ones. Make sure to use the query and not the name! Example response:
```
{  
   "statuses":[  
      {  
         "metadata":{  
            "iso_language_code":"en",
            "result_type":"recent"
         },
         "created_at":"Tue Feb 23 00:00:53 +0000 2016",
         "id":701919622652628992,
         "id_str":"701919622652628992",
         "text":"Happy #NationalMargaritaDay dear friends! #WishYouWereHere! @ Casa Margarita - La Grange https:\/\/t.co\/60X4lAr9kh",
         "source":"\u003ca href=\"http:\/\/instagram.com\" rel=\"nofollow\"\u003eInstagram\u003c\/a\u003e",
         "truncated":false,
         "in_reply_to_status_id":null,
         "in_reply_to_status_id_str":null,
         "in_reply_to_user_id":null,
         "in_reply_to_user_id_str":null,
         "in_reply_to_screen_name":null,
         "user":{  
            "id":14703779,
            "id_str":"14703779",
            "name":"Fred LeBaron",
            "screen_name":"flybrariman",
            "location":"Chicago Illinois",
            "description":"Life is an awful, ugly place to not have a best friend. Sarah Dessen, Someone Like You",
            "url":"http:\/\/t.co\/aaZp8yJcc0",
            "entities":{  
               "url":{  
                  "urls":[  
                     {  
                        "url":"http:\/\/t.co\/aaZp8yJcc0",
                        "expanded_url":"http:\/\/stillseekingallies.blogspot.com\/",
                        "display_url":"stillseekingallies.blogspot.com",
                        "indices":[  
                           0,
                           22
                        ]
                     }
                  ]
               },
               "description":{  
                  "urls":[  

                  ]
               }
            },
            "protected":false,
            "followers_count":2289,
            "friends_count":2193,
            "listed_count":32,
            "created_at":"Thu May 08 18:29:26 +0000 2008",
            "favourites_count":6987,
            "utc_offset":null,
            "time_zone":null,
            "geo_enabled":true,
            "verified":false,
            "statuses_count":12492,
            "lang":"en",
            "contributors_enabled":false,
            "is_translator":false,
            "is_translation_enabled":false,
            "profile_background_color":"C0DEED",
            "profile_background_image_url":"http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
            "profile_background_image_url_https":"https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
            "profile_background_tile":false,
            "profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/514432920371478528\/t01OzriE_normal.jpeg",
            "profile_image_url_https":"https:\/\/pbs.twimg.com\/profile_images\/514432920371478528\/t01OzriE_normal.jpeg",
            "profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/14703779\/1411485068",
            "profile_link_color":"0084B4",
            "profile_sidebar_border_color":"C0DEED",
            "profile_sidebar_fill_color":"DDEEF6",
            "profile_text_color":"333333",
            "profile_use_background_image":true,
            "has_extended_profile":false,
            "default_profile":true,
            "default_profile_image":false,
            "following":false,
            "follow_request_sent":false,
            "notifications":false
         },
         "geo":{  
            "type":"Point",
            "coordinates":[  
               41.8144112,
               -87.8700714
            ]
         },
         "coordinates":{  
            "type":"Point",
            "coordinates":[  
               -87.8700714,
               41.8144112
            ]
         },
         "place":{  
            "id":"07c0b6b4c3ac42c4",
            "url":"https:\/\/api.twitter.com\/1.1\/geo\/id\/07c0b6b4c3ac42c4.json",
            "place_type":"city",
            "name":"La Grange Park",
            "full_name":"La Grange Park, IL",
            "country_code":"US",
            "country":"United States",
            "contained_within":[  

            ],
            "bounding_box":{  
               "type":"Polygon",
               "coordinates":[  
                  [  
                     [  
                        -87.890882,
                        41.790186
                     ],
                     [  
                        -87.851808,
                        41.790186
                     ],
                     [  
                        -87.851808,
                        41.844768
                     ],
                     [  
                        -87.890882,
                        41.844768
                     ]
                  ]
               ]
            },
            "attributes":{  

            }
         },
         "contributors":null,
         "is_quote_status":false,
         "retweet_count":0,
         "favorite_count":0,
         "entities":{  
            "hashtags":[  
               {  
                  "text":"NationalMargaritaDay",
                  "indices":[  
                     6,
                     27
                  ]
               },
               {  
                  "text":"WishYouWereHere",
                  "indices":[  
                     42,
                     58
                  ]
               }
            ],
            "symbols":[  

            ],
            "user_mentions":[  

            ],
            "urls":[  
               {  
                  "url":"https:\/\/t.co\/60X4lAr9kh",
                  "expanded_url":"https:\/\/www.instagram.com\/p\/BCG588TtRTz\/",
                  "display_url":"instagram.com\/p\/BCG588TtRTz\/",
                  "indices":[  
                     89,
                     112
                  ]
               }
            ]
         },
         "favorited":false,
         "retweeted":false,
         "possibly_sensitive":false,
         "lang":"en"
      },
```
