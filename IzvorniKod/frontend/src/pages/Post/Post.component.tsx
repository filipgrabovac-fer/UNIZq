import SelectedPostHeader from "../../components/SelectedPostHeader/SelectedPostHeader";
import { AnswerComponent } from "../../components/AnswerComponent/AnswerComponent";
import { AddAnswerComponent } from "../../components/SearchComponent/AddAnswerComponent";

export const Post = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <SelectedPostHeader
          images={[
            "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
            "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
            "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
          ]}
          postAuthor="Post Author"
          postData="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aspernatur architecto provident saepe dicta, quasi fuga consequatur amet quo tempora atque ad, maiores nemo magni tenetur in quos recusandae fugiat?"
          postName="Post Name"
        />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <AnswerComponent
          answerAuthor="Answer author"
          answerText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique."
          pictures={[
            "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
            "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
            "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
          ]}
        />
        <AnswerComponent
          answerAuthor="Answer author"
          answerText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique."
          pictures={[
            "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
            "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
            "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
          ]}
        />
        <AnswerComponent
          answerAuthor="Answer author"
          answerText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique."
          pictures={[
            "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
            "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
            "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
          ]}
        />
        <AnswerComponent
          answerAuthor="Answer author"
          answerText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique."
          pictures={[
            "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
            "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
            "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
          ]}
        />
        <AnswerComponent
          answerAuthor="Answer author"
          answerText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur quas
minus, dolore, laboriosam aliquid natus officia consequatur commodi
iusto modi nisi magni, quisquam ducimus rerum ad nostrum itaque nobis
similique."
          pictures={[
            "https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_640.jpg",
            "https://cdn.pixabay.com/photo/2020/10/22/10/05/formula-5675604_640.jpg",
            "https://cdn.pixabay.com/photo/2024/12/05/11/17/fishing-9246365_640.jpg",
          ]}
        />
      </div>
      <div className="flex-none sticky bottom-0 my-2 bg-white">
        <AddAnswerComponent postContent="Explain theory of relativity" />
      </div>
    </div>
  );
};
