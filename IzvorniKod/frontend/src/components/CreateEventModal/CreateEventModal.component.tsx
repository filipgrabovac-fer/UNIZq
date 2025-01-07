import { Dispatch, SetStateAction, useState } from "react";
import { Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { usePostEvent } from "./hooks/usePostEvent.hook";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateEventModalForm } from "./components/CreateEventModalForm";
import { useGetFacultiesWithAdminPermissions } from "../../pages/Users/hooks/useGetFacultiesWithAdminPermissions.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";

type CreateEventModalProps = {
  setState: Dispatch<SetStateAction<boolean>>;
};

export const createEventSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  lat_lng: Yup.object().shape({
    lat: Yup.number().required(),
    lng: Yup.number().required(),
  }),
  faculty_id: Yup.number().required(),
});

export type CreateEventSchemaType = Yup.InferType<typeof createEventSchema>;

export const CreateEventModal = ({ setState }: CreateEventModalProps) => {
  const [markerRef] = useMarkerRef();
  const queryClient = useQueryClient();
  const [isEventErrorModalOpen, setIsEventErrorModalOpen] = useState(true);

  const { mutate: postEvent } = usePostEvent({
    onSuccess: () => {
      setState(false);
      queryClient.invalidateQueries({ queryKey: ["all-events"] });
    },
  });

  const { data: facultyData } = useGetFacultiesWithAdminPermissions();
  const facultyOptions = facultyData?.map((element) => ({
    value: element.facultyId,
    label: element.facultyName,
  }));

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray bg-opacity-20 w-screen h-screen flex z-10">
      <div className="flex flex-col m-auto bg-white px-8 pt-4 pb-8 rounded-lg max-[950px]:w-full max-[950px]:rounded-none">
        {facultyOptions?.length == 0 ? (
          <Modal
            open={isEventErrorModalOpen}
            footer={null}
            onCancel={() => {
              setIsEventErrorModalOpen(false);
              setState(false);
            }}
            width="60%"
            centered
          >
            <p>
              You have no available faculties to create an event for. You can
              apply for a higher role when selecting a different faculty
            </p>
          </Modal>
        ) : (
          <>
            <h1 className="text-xxl font-semibold mb-4">Add event</h1>
            <div className="flex m-auto w-max gap-x-20 max-[950px]:flex-col  max-[950px]:w-full">
              <Formik
                validationSchema={createEventSchema}
                onSubmit={({ title, description, lat_lng, faculty_id }) => {
                  postEvent({
                    title: title,
                    description: description,
                    latitude: lat_lng.lat ?? 0,
                    longitude: lat_lng.lng ?? 0,
                    faculty_id: faculty_id ?? 0,
                  });
                }}
                initialValues={{
                  title: "",
                  description: "",
                  lat_lng: { lat: undefined, lng: undefined },
                  faculty_id: facultyOptions ? facultyOptions[0].value : 0,
                }}
              >
                {({ values, setFieldValue }) => (
                  <>
                    <Map
                      className="w-full max-[950px]:h-[400px]"
                      defaultZoom={14}
                      defaultCenter={{ lat: 45.815, lng: 15.9819 }}
                      onClick={(event) => {
                        setFieldValue("lat_lng", event.detail.latLng ?? {});
                      }}
                    >
                      {values.lat_lng.lat && values.lat_lng.lng && (
                        <Marker
                          position={{
                            lat: values.lat_lng.lat,
                            lng: values.lat_lng.lng,
                          }}
                          ref={markerRef}
                        />
                      )}
                    </Map>
                    <CreateEventModalForm
                      setState={setState}
                      facultyOptions={facultyOptions ?? []}
                    />
                  </>
                )}
              </Formik>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
