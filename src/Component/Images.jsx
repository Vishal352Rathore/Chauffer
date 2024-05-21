import admin_profile from "../Assetes/images/admin_profile.png";
import logo from "../Assetes/images/chauffer_logo.png";
import dashboard_icon from "../Assetes/images/dashboard_icon.png";
import all_rides_icon from "../Assetes/images/ride_icon.png";
import add_driver_icon from "../Assetes/images/driver_icon.png";
import add_vehicle_icon from "../Assetes/images/add_vehicle.png";
import agent_icon from "../Assetes/images/agent.png";
import earning_icon from "../Assetes/images/earning.png";
import complaints_icon from "../Assetes/images/complaints.png";
import terms_condition_icon from "../Assetes/images/terms_condition.png";
import policy_icon from "../Assetes/images/policy.png";
import logout_icon from "../Assetes/images/logout.png";
import defaultProfile from "../Assetes/images/default_profile.png"
import upload_document_icon from "../Assetes/images/upload_document_icon.png"
import gold_coins from "../Assetes/images/gold_coins.png";
import login_image from "../Assetes/images/login_image.png";
import available_vehicle_bg from "../Assetes/images/running_vehicle_bg.png";
import running_vehicle_bg from "../Assetes/images/available_vehicle_bg.png";
import booked_vehicle_bg from "../Assetes/images/booked_vehicle_bg.png";
import available_drivers_bg from "../Assetes/images/available_drivers_bg.png";
import running_drivers_bg from "../Assetes/images/running_drivers_bg.png";
import agency_owners_bg from "../Assetes/images/agency_owners_bg.png";
import available_vehicle_icon from "../Assetes/images/available_vehicle.png";
import running_vehicle_icon from "../Assetes/images/running_vehicle.png";
import search_icon from "../Assetes/images/search_icon.png"
import booked_vehicle_icon from "../Assetes/images/booked_vehicle_icon.png"
import availabel_driver_icon from "../Assetes/images/available_driver_icon.png"; 
import running_drivers_icon from "../Assetes/images/running_drivers_icon.png"
import agency_owners_icon from  "../Assetes/images/agency_owners_icon.png";
import view_icon from "../Assetes/images/view_icon.png";
import edit_icon from "../Assetes/images/edit_icon.png";
import delete_icon from "../Assetes/images/delete_icon.png";
import profile_img from "../Assetes/images/profile_img.png";

const images = [
{"admin_profile":admin_profile},
{"logo":logo},
{"dashboard_icon":dashboard_icon},
{"all_rides_icon":all_rides_icon},
{"add_driver_icon":add_driver_icon},
{"add_vehicle_icon":add_vehicle_icon},
{"agent_icon":agent_icon},
{"earning_icon":earning_icon},
{"complaints_icon":complaints_icon},
{"terms_condition_icon":terms_condition_icon},
{"policy_icon":policy_icon},
{"logout_icon":logout_icon},
{"defaultProfile":defaultProfile},
{"gold_coins":gold_coins},
{"login_image":login_image},
{"available_vehicle_bg":available_vehicle_bg},
{"running_vehicle_bg":running_vehicle_bg},
{"booked_vehicle_bg":booked_vehicle_bg},
{"available_drivers_bg":available_drivers_bg},
{"running_drivers_bg":running_drivers_bg},
{"agency_owners_bg":agency_owners_bg},
{"available_vehicle_icon":available_vehicle_icon},
{"running_vehicle_icon":running_vehicle_icon},
{"booked_vehicle_icon":booked_vehicle_icon},
{"availabel_driver_icon":availabel_driver_icon},
{"running_drivers_icon":running_drivers_icon},
{"agency_owners_icon" : agency_owners_icon},
{"upload_document_icon":upload_document_icon},
{"search_icon":search_icon},
{"view_icon":view_icon},
{"edit_icon" : edit_icon},
{"delete_icon" : delete_icon},
{"profile_img" : profile_img}
]

const Images = (image_key) => {
    return images
    .filter(obj => obj.hasOwnProperty(image_key)) // Filter out objects that don't have the key
    .map(obj => obj[image_key]);
}

export default Images