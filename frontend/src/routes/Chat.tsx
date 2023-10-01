import { Prompt } from "@/components/Prompt";
import { Messages } from "@/components/Messages";
import { Card } from "@/components/ui/card";

export function Chat() {
    return (
        <div className="flex h-full">
            <div className="grid-row mx-auto grid h-full gap-4 md:w-[680px] md:grid-cols-[5fr_2fr] lg:w-[940px] xl:w-[1200px]">
                <Card className="order-1 mx-auto flex h-[480px] max-h-full flex-col gap-4 overflow-y-scroll sm:w-[60ch] md:h-auto md:w-[52ch] lg:w-[72ch] xl:w-[92ch]">
                    <Messages
                        data={[
                            {
                                message:
                                    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.orem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                                type: "ai",
                                actions: [
                                    "napisz mi mega skompliklopwany esej ale taki serio dobry",
                                    "ssd",
                                    "awaw efefege fefefef efef efeefsgrw efefrbre efefgs",
                                ],
                            },
                            {
                                message:
                                    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                                type: "user",
                            },
                        ]}
                    />
                    <Prompt />
                </Card>

                {/* Jak będzie czas to może resize zrobimy */}
                {/* <IconMinusVertical */}
                {/*     size={60} */}
                {/*     className="-m-4 text-gray-400 hover:text-gray-800 hover:cursor-col-resize" */}
                {/* /> */}

                <Card className="overflow-y-scroll p-6 md:order-1">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Hic repellat maiores esse ex, officia mollitia itaque dolor.
                    Tenetur ut sunt debitis, quasi, quos eligendi neque laborum
                    distinctio, facere provident iure! Eius sequi non laboriosam
                    ducimus similique tempore aperiam aspernatur odio pariatur
                    sapiente vero unde est, doloremque ab nisi beatae, incidunt
                    placeat nostrum qui earum itaque soluta id. Iusto, assumenda
                    excepturi. Sequi aspernatur ducimus illo quasi rem nisi sint
                    error, harum dolores fuga officia cum ab vel, reiciendis
                    reprehenderit quod aliquam minus ipsam atque quos laborum
                    dolorum. Ea mollitia eligendi itaque? Sequi beatae
                    perferendis aut ad sunt? Debitis hic iste dignissimos,
                    voluptate velit voluptatibus esse in error quidem quas neque
                    iusto tenetur beatae repudiandae itaque eveniet incidunt
                    eligendi sed dicta praesentium! Doloremque recusandae
                    perspiciatis, aperiam fugit eaque odit sed eveniet illo
                    labore quibusdam, neque esse non minus commodi! Nam illum
                    sint iusto, ducimus, optio fugit, culpa consequatur
                    distinctio nisi dolorem aspernatur! Dolore praesentium cum
                    provident labore quo quisquam corporis doloremque unde
                    aliquid eos, porro minima ab exercitationem ipsam debitis
                    voluptatem obcaecati earum quia eveniet illo dicta. Cumque
                    mollitia unde voluptatibus. Modi. Dolore doloribus ab saepe
                    dicta. Saepe officia minima nisi, eligendi eos ipsa nam
                    illum aut quam incidunt inventore eius soluta molestiae.
                    Nesciunt reprehenderit natus doloremque! Alias deleniti
                    minima magni quae! Ut reiciendis, eaque animi perferendis
                    hic fugit consectetur aliquam officia labore, voluptatum
                    accusantium provident enim repellat. Laboriosam autem vero
                    ex quos? Nesciunt impedit, porro quo dignissimos at
                    repudiandae fuga architecto. Veritatis ad architecto numquam
                    nam rerum, ducimus, beatae quis non reprehenderit cupiditate
                    iusto nobis consequatur molestias quae molestiae
                    necessitatibus itaque voluptas quas exercitationem
                    distinctio pariatur maxime iste eligendi ratione! Quas?
                </Card>
            </div>
        </div>
    );
}
