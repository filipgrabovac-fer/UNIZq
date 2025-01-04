import { AddAnswerComponent } from "../../components/SearchComponent/AddAnswerComponent";
import SelectedPostHeader from "../../components/SelectedPostHeader/SelectedPostHeader";

export const Home = () => {
  return (
    <div className="bg-secondary overflow-hidden">
      <SelectedPostHeader
        postName="Post Name"
        postData="Politički analitičari Višeslav Raos i Davor Gjenero smatraju da 
        je prednost koju je Zoran Milanović u prvom krugu izbora ostvario 
        ispred kandidata HDZ-a Dragana Primorca gotovo nedostižna te kao ključno 
        postizborno pitanje ističu suradnju izglednog pobjednika Milanovića s HDZ-ovom 
        vladom."
        postAuthor="Post Author"
        images={[
          "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
          "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
          "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
        ]}
      />
      <AddAnswerComponent postContent="Explain theory of Relativity" />
    </div>
  );
};
