import prisma from "../db";
import { createJWT, hashPassword } from "../modules/auth";
import { comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
  if (req.body.provider === "google") {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        fName: req.body.given_name,
        lName: req.body.family_name,
        id: req.body.sub,
        email: req.body.email,
      },
    });

    res.json({ data: user });
  } else if (req.body.provider === "credentials") {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        fName: req.body.fName,
        lName: req.body.lName,
        id: req.body.id,
        email: req.body.email,
        image: req.body.picture,
      },
    });

    res.json({ data: user });
  }
};

export const getUser = async (req, res) => {
    const users = await prisma.user.findMany();
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: { id: id },
    });
    res.json({ data: user });
};

// export const signin = async (req, res) => {
//     const user = await prisma.user.findUnique({
//       where: { username: req.body.username },
//     });

//     if (!user) {
//         res.status(401);
//         res.send("Invalid username or password");
//         return;
//     }

//     const isValid = await comparePasswords(req.body.password, user.password);

//     if (!isValid) {
//       res.status(401);
//       res.send("Invalid username or password");
//       return;
//     }

//     const token = createJWT(user);
//     res.json({ token });
//   };
