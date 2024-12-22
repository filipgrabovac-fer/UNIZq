import { PostPreview } from "../../components/PostPreview/PostPreview";
import { List, Card } from "antd";
import { TrashIcon } from "@heroicons/react/24/solid";

const data = [
  {
    faculty: "FSB",

    description:
      "Fakultet strojarstva i brodogradnje, Sveučilište u Zagrebu, Faculty of Mechanical Engineering and Naval Architecture, University of Zagreb.",
  },
  {
    faculty: "TVZ",

    description:
      "Tehničko veleučilište u Zagrebu, najveće učilište u Republici Hrvatskoj, pruža izobrazbu iz različitih struka: elektrotehnike, graditeljstva, informatike.",
  },
  {
    faculty: "FER",

    description:
      "FER je najveća i najutjecajnija znanstvena i obrazovna institucija u Hrvatskoj na području elektrotehnike, računarstva te informacijskih i komunikacijskih, učilište u Republici Hrvatskoj, pruža izobrazbu iz različitih struka: elektrotehnike, graditeljstva, informatike",
  },
];

export const Profile = () => {
  return (
    <div className="flex h-screen bg-secondary">
      <div>
        <div className="rounded-[20px] ">
          <p className="text-lg">My posts</p>
          <div className="w-[50vw]">
            <PostPreview
              postTitle={
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo quae odit ab magnam tempora, ut excepturi error aut impedit amet libero ipsam fugiat repudiandae aspernatur unde similique nemo hic officiis"
              }
              postID={0}
              canDelete={false}
              canModify={false}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
        <div className="w-[50%] rounded-[20px]">
          <p className="text-lg">My faculties</p>
          <List
            grid={{
              gutter: 30,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
              /*actions*/
              >
                <Card
                  className="w-[400px] h-[170px] transition-transform duration-300 hover:scale-105"
                  title={
                    <div className="flex justify-between">
                      <p>{item.faculty}</p>
                      <TrashIcon className="w-5 hover:cursor-pointer transition-transform duration-300 hover:scale-105" />
                    </div>
                  }
                >
                  <p className="line-clamp-3">{item.description}</p>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="rounded-[20px]">
        <p className="text-lg">My profile</p>
        <form action="">
          <label htmlFor=""></label>
          <input type="text" />
        </form>
      </div>
    </div>
  );
};
